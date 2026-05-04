/**
 * PlexusAI Blog Agent Pipeline
 *
 * 4 agents in sequence:
 *  1. Researcher  — searches the web for latest healthcare AI news
 *  2. Writer      — turns research into a captivating 2-min article
 *  3. Scorer      — scores clarity, relevance, engagement, accuracy
 *  4. Ethics      — checks responsible AI, flags issues
 *
 * Run manually:  node scripts/generate-blog.mjs
 * Run via cron:  set ANTHROPIC_API_KEY + SUPABASE_URL + SUPABASE_SERVICE_KEY
 */

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// ── Clients ──────────────────────────────────────────────────────────────────

const ai = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL   || process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

// ── Helpers ───────────────────────────────────────────────────────────────────

function extractJSON(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try { return JSON.parse(match[0]); } catch { return null; }
}

function textFrom(response) {
  return response.content.find(b => b.type === 'text')?.text ?? '';
}

async function callAgent({ name, system, userMessage, tools = [], maxTokens = 2048 }) {
  process.stdout.write(`  [${name}] thinking…`);
  const params = {
    model: 'claude-opus-4-7',
    max_tokens: maxTokens,
    thinking: { type: 'adaptive' },
    system,
    messages: [{ role: 'user', content: userMessage }],
  };
  if (tools.length) params.tools = tools;

  const res = await ai.messages.create(params);
  process.stdout.write(' done\n');
  return res;
}

// ── Agent 1: Researcher ───────────────────────────────────────────────────────

async function researchAgent() {
  const res = await callAgent({
    name: 'Researcher',
    maxTokens: 4096,
    tools: [{ type: 'web_search_20260209', name: 'web_search' }],
    system: `You are a healthcare AI research specialist.
Find the most important healthcare AI news from the last 24-48 hours.
Focus on: clinical AI validation, hospital AI adoption, AI diagnostics,
regulatory approvals (especially India/CDSCO), real-world evidence, and AI ethics in healthcare.
Return a structured brief:
- TOP STORY: one headline + 2-sentence summary
- KEY FACTS: 3 bullet points with source names
- IMPLICATION: why this matters for hospital AI adoption
- QUOTE (if found): one direct quote from a clinician or regulator`,
    userMessage: 'Find the most important healthcare AI news from the last 24-48 hours. Include India-specific developments where available.',
  });
  return textFrom(res);
}

// ── Agent 2: Writer ───────────────────────────────────────────────────────────

async function writerAgent(research) {
  const res = await callAgent({
    name: 'Writer',
    maxTokens: 2048,
    system: `You are a captivating healthcare AI journalist writing for clinicians, hospital leaders, and AI startups.
Write a 2-minute read (250-320 words). Rules:
- Active voice only ("Doctors now use…", "Hospitals are adopting…", "We tested…")
- First sentence must hook the reader — make them want to keep reading
- Structure: Hook → What happened → Why it matters for hospitals → What comes next
- No jargon: not "paradigm shift", "synergy", "leverage", "utilize"
- Be honest about limitations and uncertainty
- End with one concrete implication for healthcare AI adoption

Return ONLY a JSON object in this exact shape:
{
  "title": "headline under 12 words",
  "summary": "one sentence that captures the story",
  "body": "full article text (250-320 words)",
  "tags": ["tag1", "tag2", "tag3"],
  "readMinutes": 2
}`,
    userMessage: `Write a 2-minute healthcare AI news article based on this research:\n\n${research}`,
  });

  const text = textFrom(res);
  const article = extractJSON(text);
  if (!article) throw new Error(`Writer returned unparseable output:\n${text.slice(0, 300)}`);
  return article;
}

// ── Agent 3: Scorer ───────────────────────────────────────────────────────────

async function scorerAgent(article) {
  const res = await callAgent({
    name: 'Scorer',
    maxTokens: 512,
    system: `You are an editorial quality scorer. Score on 4 dimensions (1-10):
- clarity: easy to understand for a non-expert?
- relevance: important to hospital AI decision-makers?
- engagement: would a busy clinician read to the end?
- accuracy: are the claims factually grounded?

Return ONLY JSON: { "clarity": N, "relevance": N, "engagement": N, "accuracy": N, "average": N, "notes": "one line" }`,
    userMessage: `Score this article:\n\nTitle: ${article.title}\n\n${article.body}`,
  });

  const score = extractJSON(textFrom(res)) ?? { clarity: 5, relevance: 5, engagement: 5, accuracy: 5, average: 5 };
  score.average = +(((score.clarity + score.relevance + score.engagement + score.accuracy) / 4).toFixed(1));
  return score;
}

// ── Agent 4: Ethics Reviewer ──────────────────────────────────────────────────

async function ethicsAgent(article) {
  const res = await callAgent({
    name: 'Ethics',
    maxTokens: 512,
    system: `You are an AI ethics and responsible content reviewer for healthcare journalism.
Check for:
- Overclaiming: does it exaggerate what AI can do?
- Patient safety: no advice that could harm patients
- Bias: fair representation of communities and institutions
- Transparency: clear about what is validated vs. speculative
- Responsible AI: acknowledges limitations

Return ONLY JSON:
{ "approved": true/false, "flags": ["flag1"], "suggestions": ["fix1"], "note": "one-line summary" }

Approve if there are no serious issues. Minor suggestions are fine.`,
    userMessage: `Review this healthcare AI article:\n\nTitle: ${article.title}\n\n${article.body}`,
  });

  return extractJSON(textFrom(res)) ?? { approved: false, flags: ['parse error'], suggestions: [], note: '' };
}

// ── Pipeline ──────────────────────────────────────────────────────────────────

async function run() {
  console.log('\n🏥 PlexusAI Blog Agent Pipeline\n');

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
