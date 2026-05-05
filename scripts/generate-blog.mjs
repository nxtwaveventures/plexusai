/**
 * PlexusAI Blog Agent Pipeline — Groq + Google News RSS (fully free)
 *
 * Runs once per day at 8 AM IST via GitHub Actions.
 * Skips if an article was already published today.
 *
 * 5 steps:
 *  1. Guard     — skip if already published today
 *  2. Researcher — fetches from 4 news queries, synthesises the best story
 *  3. Writer    — writes a captivating 2-min article
 *  4. Scorer    — scores clarity, relevance, engagement, accuracy
 *  5. Ethics    — checks responsible AI, GDPR, patient safety
 *  + Image      — generates a FLUX image via Pollinations, stored in DB
 */

import Groq from 'groq-sdk';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// ── Clients ───────────────────────────────────────────────────────────────────

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL   || process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

const MODEL = 'llama-3.3-70b-versatile';

// ── Helpers ───────────────────────────────────────────────────────────────────

function extractJSON(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try { return JSON.parse(match[0]); } catch { return null; }
}

async function callAgent({ name, system, userMessage, maxTokens = 2048 }) {
  process.stdout.write(`  [${name}] thinking…`);
  const res = await groq.chat.completions.create({
    model: MODEL,
    max_tokens: maxTokens,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: userMessage },
    ],
  });
  process.stdout.write(' done\n');
  return res.choices[0].message.content ?? '';
}

// ── Google News RSS (free, no API key) ────────────────────────────────────────

async function fetchGoogleNews(query) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-IN&gl=IN&ceid=IN:en`;
  const res = await fetch(url);
  if (!res.ok) return '';
  const xml = await res.text();

  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null && items.length < 8) {
    const block = match[1];
    const title   = (block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)   || block.match(/<title>(.*?)<\/title>/))?.[1]   ?? '';
    const source  = (block.match(/<source[^>]*>(.*?)<\/source>/))?.[1] ?? '';
    const pubDate = (block.match(/<pubDate>(.*?)<\/pubDate>/))?.[1] ?? '';
    const desc    = (block.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) || block.match(/<description>(.*?)<\/description>/))?.[1] ?? '';
    const clean   = desc.replace(/<[^>]+>/g, '').slice(0, 250);
    items.push(`• ${title} [${source}, ${pubDate}]\n  ${clean}`);
  }
  return items.join('\n\n');
}

// ── Step 1: Guard — skip if already published today ───────────────────────────

async function alreadyPublishedToday() {
  const today = new Date().toISOString().slice(0, 10);
  const { data } = await supabase
    .from('blog_posts')
    .select('id')
    .eq('published', true)
    .gte('created_at', `${today}T00:00:00Z`)
    .limit(1);
  return (data?.length ?? 0) > 0;
}

async function getRecentTitles() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { data } = await supabase
    .from('blog_posts')
    .select('title')
    .gte('created_at', sevenDaysAgo);
  return (data ?? []).map(p => p.title.toLowerCase());
}

// ── Step 2: Researcher ────────────────────────────────────────────────────────

async function researchAgent() {
  process.stdout.write('  [Researcher] fetching news from 4 sources…');

  const [global, india, clinical, regulatory] = await Promise.all([
    fetchGoogleNews('healthcare AI hospital clinical validation 2025'),
    fetchGoogleNews('healthcare AI India CDSCO hospital 2025'),
    fetchGoogleNews('clinical AI diagnostics radiology pathology 2025'),
    fetchGoogleNews('AI medical device regulation FDA CDSCO approval 2025'),
  ]);

  process.stdout.write(' done\n');

  const allNews = [
    `=== Global Healthcare AI ===\n${global}`,
    `=== India Healthcare AI ===\n${india}`,
    `=== Clinical AI & Diagnostics ===\n${clinical}`,
    `=== Regulatory Approvals ===\n${regulatory}`,
  ].join('\n\n');

  const brief = await callAgent({
    name: 'Researcher',
    maxTokens: 1200,
    system: `You are a senior healthcare AI research analyst with 15 years of experience.
Read today's news carefully and identify THE single most important story — the one with the biggest real-world impact on patients, hospitals, or the healthcare AI industry.

Return a structured brief:
- TOP STORY: specific headline + 3-sentence summary with concrete numbers/facts
- WHY IT MATTERS: one specific implication for hospital AI adoption in India
- KEY FACTS: 3 bullet points with source names and dates
- COUNTER-POINT: one limitation or concern to acknowledge
- GDPR/ETHICS NOTE: any data privacy or patient safety angle

Be specific. Never say "AI is transforming healthcare" — say exactly what happened, where, and by how much.`,
    userMessage: `Today's healthcare AI news:\n\n${allNews}`,
  });

  return brief;
}

// ── Step 3: Writer ─────────────────────────────────────────────────────────────

async function writerAgent(research, recentTitles = []) {
  const text = await callAgent({
    name: 'Writer',
    maxTokens: 2048,
    system: `You are an award-winning healthcare AI journalist. Your articles are read by CMOs, hospital CIOs, and AI startup founders.

Write a 2-minute read (280-320 words). Rules:
- Active voice: "Doctors now use…", "Apollo deployed…", "AIIMS found…"
- First sentence: drop the reader into a specific moment or fact — no scene-setting
- Structure: Hook (1 sentence) → What happened (2-3 sentences) → Why hospitals should care (2 sentences) → What's next (1-2 sentences) → One concrete takeaway
- Be specific: name hospitals, cities, percentages, patient numbers where available
- Acknowledge limitations: what's not yet proven, what could go wrong
- No jargon: no "paradigm shift", "synergy", "leverage", "utilize", "transformative"
- GDPR/data privacy: if patient data is involved, note how it's handled

Title rules — be specific, name the tech/hospital/country:
✓ "AIIMS Delhi Cuts Radiology Wait Time 40% with AI Triage"
✓ "CDSCO Clears First AI Diagnostic Tool for Tier-2 Indian Hospitals"
✗ "AI is Changing Healthcare" (too generic)
✗ "India Regulates AI" (too vague)

Return ONLY valid JSON, no markdown:
{
  "title": "specific headline, max 12 words",
  "summary": "one sentence capturing the story with one key fact",
  "body": "full article (280-320 words)",
  "tags": ["tag1", "tag2", "tag3"],
  "imagePrompt": "a vivid, specific visual description for this story (e.g. 'Indian radiologist reviewing AI-highlighted chest X-ray scans on dual monitors in a busy Mumbai hospital')",
  "readMinutes": 2
}`,
    userMessage: `Write a 2-minute healthcare AI article based on:\n\n${research}${recentTitles.length ? `\n\nDO NOT cover these topics already published this week:\n${recentTitles.map(t => `- ${t}`).join('\n')}` : ''}`,
  });

  const article = extractJSON(text);
  if (!article) throw new Error(`Writer returned unparseable output:\n${text.slice(0, 300)}`);
  return article;
}

// ── Step 4: Scorer ─────────────────────────────────────────────────────────────

async function scorerAgent(article) {
  const text = await callAgent({
    name: 'Scorer',
    maxTokens: 512,
    system: `You are a ruthless editorial quality scorer. Be honest — most articles score 6-8, not 9-10.
Score on 4 dimensions (1-10):
- clarity: can a non-expert read this without confusion?
- relevance: does this matter to hospital AI decision-makers RIGHT NOW?
- engagement: would a CMO read past the first paragraph?
- accuracy: are claims specific, grounded, and appropriately hedged?

Return ONLY JSON: { "clarity": N, "relevance": N, "engagement": N, "accuracy": N, "average": N, "notes": "one specific critique" }`,
    userMessage: `Score this article:\n\nTitle: ${article.title}\n\n${article.body}`,
  });

  const score = extractJSON(text) ?? { clarity: 5, relevance: 5, engagement: 5, accuracy: 5, average: 5 };
  score.average = +(((score.clarity + score.relevance + score.engagement + score.accuracy) / 4).toFixed(1));
  return score;
}

// ── Step 5: Ethics Reviewer ────────────────────────────────────────────────────

async function ethicsAgent(article) {
  const text = await callAgent({
    name: 'Ethics',
    maxTokens: 512,
    system: `You are a responsible AI and healthcare ethics reviewer. Check for:
- Overclaiming: does it exaggerate AI capabilities or outcomes?
- Patient safety: could any statement lead to unsafe clinical decisions?
- Data privacy: is patient data handling described appropriately (GDPR/DPDP compliant)?
- Bias: fair representation of communities, not just elite urban hospitals?
- Transparency: clear about what is validated vs. speculative?
- Misinformation risk: could this be misread to harm patients or delay care?

Return ONLY JSON:
{ "approved": true/false, "flags": ["issue1"], "suggestions": ["fix1"], "note": "one-line verdict" }

Approve if no serious issues. Flag anything a patient advocate would object to.`,
    userMessage: `Review for responsible AI and GDPR compliance:\n\nTitle: ${article.title}\n\n${article.body}`,
  });

  return extractJSON(text) ?? { approved: false, flags: ['parse error'], suggestions: [], note: '' };
}

// ── Image generation via Pollinations FLUX ─────────────────────────────────────

async function generateImage(article) {
  const prompt = article.imagePrompt
    || `${article.title}, healthcare technology, India, professional editorial photography`;
  const seed = Math.floor(Math.random() * 99999);
  const encoded = encodeURIComponent(
    `${prompt}, photorealistic, cinematic lighting, 8k, professional`
  );
  const url = `https://image.pollinations.ai/prompt/${encoded}?model=flux&width=1280&height=680&nologo=true&seed=${seed}&enhance=true`;

  process.stdout.write('  [Image] generating with FLUX…');
  try {
    // Ping to trigger generation and cache
    const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (res.ok) {
      process.stdout.write(' done\n');
      return url;
    }
  } catch { /* timeout ok — URL still works later */ }
  process.stdout.write(' queued\n');
  return url;
}

// ── Pipeline ───────────────────────────────────────────────────────────────────

async function run() {
  console.log('\n🏥 PlexusAI Blog Pipeline\n');

  console.log('⓪ Checking if already published today…');
  if (await alreadyPublishedToday()) {
    console.log('   → Already published today. Skipping.\n');
    process.exit(0);
  }
  console.log('   → No post yet today. Proceeding.\n');

  const recentTitles = await getRecentTitles();
  console.log(`   → ${recentTitles.length} articles published in last 7 days\n`);

  console.log('① Researcher — scanning 4 news sources…');
  const research = await researchAgent();

  console.log('② Writer — drafting article…');
  const article = await writerAgent(research, recentTitles);
  console.log(`   → "${article.title}"`);

  console.log('③ Scorer — evaluating quality…');
  const score = await scorerAgent(article);
  console.log(`   → ${score.average}/10 (clarity ${score.clarity} | relevance ${score.relevance} | engagement ${score.engagement} | accuracy ${score.accuracy})`);
  console.log(`   → ${score.notes}`);

  console.log('④ Ethics — checking responsible AI & GDPR…');
  const ethics = await ethicsAgent(article);
  console.log(`   → ${ethics.approved ? '✅ Approved' : '⚠️  Flagged'}: ${ethics.note}`);
  if (ethics.flags?.length) console.log(`   Flags: ${ethics.flags.join(', ')}`);

  console.log('⑤ Image — generating FLUX cover…');
  const imageUrl = await generateImage(article);

  const publish = ethics.approved && score.average >= 6.5;

  const row = {
    title:              article.title,
    summary:            article.summary,
    body:               article.body,
    tags:               article.tags ?? [],
    read_minutes:       article.readMinutes ?? 2,
    image_url:          imageUrl,
    score_clarity:      score.clarity,
    score_relevance:    score.relevance,
    score_engagement:   score.engagement,
    score_accuracy:     score.accuracy,
    score_average:      score.average,
    score_notes:        score.notes ?? '',
    ethics_approved:    ethics.approved,
    ethics_flags:       ethics.flags ?? [],
    ethics_suggestions: ethics.suggestions ?? [],
    published:          publish,
    research_brief:     research,
  };

  console.log('\n💾 Saving to Supabase…');
  const { data, error } = await supabase.from('blog_posts').insert([row]).select();
  if (error) { console.error('Supabase error:', error.message); process.exit(1); }

  console.log(`\n✨ Done — post ${publish ? 'PUBLISHED' : 'saved (needs review)'}`);
  console.log(`   ID: ${data[0].id}`);
  console.log(`   Title: "${row.title}"`);
  console.log(`   Score: ${score.average}/10 | Ethics: ${ethics.approved ? '✅' : '⚠️'} | Published: ${publish}\n`);
}

run().catch(err => { console.error('\n❌', err.message); process.exit(1); });
