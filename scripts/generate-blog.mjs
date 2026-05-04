/**
 * PlexusAI Blog Agent Pipeline — powered by Groq (free) + Google News RSS (free)
 *
 * 4 agents in sequence:
 *  1. Researcher  — fetches today's healthcare AI headlines via Google News RSS
 *  2. Writer      — turns research into a captivating 2-min article (Groq)
 *  3. Scorer      — scores clarity, relevance, engagement, accuracy (Groq)
 *  4. Ethics      — checks responsible AI, flags issues (Groq)
 *
 * Only one key needed:
 *  - Groq: console.groq.com → GROQ_API_KEY
 *
 * Run manually:  node scripts/generate-blog.mjs
 */

import Groq from 'groq-sdk';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// ── Clients ──────────────────────────────────────────────────────────────────

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL   || process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

const MODEL = 'llama-3.3-70b-versatile'; // free on Groq, excellent quality

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

// ── Google News RSS (free, no API key) ───────────────────────────────────────

async function fetchGoogleNews(query) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-IN&gl=IN&ceid=IN:en`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`News RSS error: ${res.status}`);
  const xml = await res.text();

  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null && items.length < 10) {
    const block = match[1];
    const title   = (block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)   || block.match(/<title>(.*?)<\/title>/))?.[1]   ?? '';
    const source  = (block.match(/<source[^>]*>(.*?)<\/source>/))?.[1] ?? '';
    const pubDate = (block.match(/<pubDate>(.*?)<\/pubDate>/))?.[1] ?? '';
    const desc    = (block.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) || block.match(/<description>(.*?)<\/description>/))?.[1] ?? '';
    const clean   = desc.replace(/<[^>]+>/g, '').slice(0, 300);
    items.push(`TITLE: ${title}\nSOURCE: ${source} | ${pubDate}\nSNIPPET: ${clean}\n`);
  }
  return items.join('\n');
}

// ── Agent 1: Researcher ───────────────────────────────────────────────────────

async function researchAgent() {
  process.stdout.write('  [Researcher] fetching news…');
  const [general, india] = await Promise.all([
    fetchGoogleNews('healthcare AI clinical validation hospital 2025'),
    fetchGoogleNews('healthcare AI India CDSCO hospital 2025'),
  ]);
  process.stdout.write(' done\n');

  const searchText = `=== Global Healthcare AI News ===\n${general}\n=== India Healthcare AI News ===\n${india}`;

  const brief = await callAgent({
    name: 'Researcher',
    maxTokens: 1024,
    system: `You are a healthcare AI research specialist.
Read these web search results and produce a structured research brief:
- TOP STORY: one headline + 2-sentence summary
- KEY FACTS: 3 bullet points with source names
- IMPLICATION: why this matters for hospital AI adoption
- QUOTE (if found): one direct quote from a clinician or regulator
Focus on: clinical AI validation, hospital AI adoption, diagnostics, India/CDSCO news, real-world evidence, AI ethics in healthcare.`,
    userMessage: `Here are today's search results:\n\n${searchText}`,
  });

  return brief;
}

// ── Agent 2: Writer ───────────────────────────────────────────────────────────

async function writerAgent(research) {
  const text = await callAgent({
    name: 'Writer',
    maxTokens: 2048,
    system: `You are a captivating healthcare AI journalist writing for clinicians, hospital leaders, and AI startups.
Write a 2-minute read (250-320 words). Rules:
- Active voice only ("Doctors now use…", "Hospitals are adopting…")
- First sentence must hook the reader — make them want to keep reading
- Structure: Hook → What happened → Why it matters for hospitals → What comes next
- No jargon: not "paradigm shift", "synergy", "leverage", "utilize"
- Be honest about limitations and uncertainty
- End with one concrete implication for healthcare AI adoption

Title rules (CRITICAL):
- Must be specific, not generic — name the technology, country, disease, or hospital
- Good: "AIIMS Delhi Cuts Radiology Wait Time by 40% Using AI" or "CDSCO Clears First AI Diagnostic Tool for Rural Clinics"
- Bad: "AI in Healthcare", "India Regulates AI", "Healthcare AI Faces Challenges"
- Never write a title that could apply to any article — make it THIS story only

Return ONLY a JSON object in this exact shape (no extra text, no markdown):
{
  "title": "specific headline under 12 words",
  "summary": "one sentence that captures the story",
  "body": "full article text (250-320 words)",
  "tags": ["tag1", "tag2", "tag3"],
  "readMinutes": 2
}`,
    userMessage: `Write a 2-minute healthcare AI news article based on this research:\n\n${research}`,
  });

  const article = extractJSON(text);
  if (!article) throw new Error(`Writer returned unparseable output:\n${text.slice(0, 300)}`);
  return article;
}

// ── Agent 3: Scorer ───────────────────────────────────────────────────────────

async function scorerAgent(article) {
  const text = await callAgent({
    name: 'Scorer',
    maxTokens: 512,
    system: `You are an editorial quality scorer. Score on 4 dimensions (1-10):
- clarity: easy to understand for a non-expert?
- relevance: important to hospital AI decision-makers?
- engagement: would a busy clinician read to the end?
- accuracy: are the claims factually grounded?

Return ONLY JSON (no extra text): { "clarity": N, "relevance": N, "engagement": N, "accuracy": N, "average": N, "notes": "one line" }`,
    userMessage: `Score this article:\n\nTitle: ${article.title}\n\n${article.body}`,
  });

  const score = extractJSON(text) ?? { clarity: 5, relevance: 5, engagement: 5, accuracy: 5, average: 5 };
  score.average = +(((score.clarity + score.relevance + score.engagement + score.accuracy) / 4).toFixed(1));
  return score;
}

// ── Agent 4: Ethics Reviewer ──────────────────────────────────────────────────

async function ethicsAgent(article) {
  const text = await callAgent({
    name: 'Ethics',
    maxTokens: 512,
    system: `You are an AI ethics and responsible content reviewer for healthcare journalism.
Check for:
- Overclaiming: does it exaggerate what AI can do?
- Patient safety: no advice that could harm patients
- Bias: fair representation of communities and institutions
- Transparency: clear about what is validated vs. speculative
- Responsible AI: acknowledges limitations

Return ONLY JSON (no extra text):
{ "approved": true, "flags": [], "suggestions": [], "note": "one-line summary" }

Approve if there are no serious issues. Minor suggestions are fine.`,
    userMessage: `Review this healthcare AI article:\n\nTitle: ${article.title}\n\n${article.body}`,
  });

  return extractJSON(text) ?? { approved: false, flags: ['parse error'], suggestions: [], note: '' };
}

// ── Pipeline ──────────────────────────────────────────────────────────────────

async function run() {
  console.log('\n🏥 PlexusAI Blog Agent Pipeline (Groq + Tavily — free)\n');

  console.log('① Researcher — searching healthcare AI news…');
  const research = await researchAgent();

  console.log('② Writer — drafting article…');
  const article = await writerAgent(research);
  console.log(`   → "${article.title}"`);

  console.log('③ Scorer — evaluating quality…');
  const score = await scorerAgent(article);
  console.log(`   → Score: ${score.average}/10 (clarity ${score.clarity} | relevance ${score.relevance} | engagement ${score.engagement} | accuracy ${score.accuracy})`);

  console.log('④ Ethics Reviewer — checking responsible AI…');
  const ethics = await ethicsAgent(article);
  console.log(`   → ${ethics.approved ? '✅ Approved' : '⚠️  Flagged'}: ${ethics.note}`);
  if (ethics.flags?.length) console.log(`   Flags: ${ethics.flags.join(', ')}`);

  const publish = ethics.approved && score.average >= 6.0;

  const row = {
    title:              article.title,
    summary:            article.summary,
    body:               article.body,
    tags:               article.tags ?? [],
    read_minutes:       article.readMinutes ?? 2,
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
