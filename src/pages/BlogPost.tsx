import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Logo from '../components/Logo';

interface Post {
  id: string;
  created_at: string;
  title: string;
  summary: string;
  body: string;
  tags: string[];
  read_minutes: number;
}

const TAG_COLORS: Record<string, string> = {
  'Clinical AI': '#0D9488',
  'Validation':  '#2563EB',
  'Regulation':  '#7C3AED',
  'Diagnostics': '#059669',
  'India':       '#D97706',
  'RWE':         '#DC2626',
  'Hospitals':   '#0D9488',
};

function tagColor(tag: string) {
  for (const [k, v] of Object.entries(TAG_COLORS)) {
    if (tag.toLowerCase().includes(k.toLowerCase())) return v;
  }
  return '#6B7280';
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supabase
      .from('blog_posts')
      .select('id, created_at, title, summary, body, tags, read_minutes')
      .eq('id', id)
      .eq('published', true)
      .single()
      .then(({ data }) => {
        setPost(data ?? null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading…</div>
    </div>
  );

  if (!post) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
      <div style={{ color: 'var(--text-muted)' }}>Article not found.</div>
      <Link to="/#blog" style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>← Back to blog</Link>
    </div>
  );

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid var(--border)', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'inline-flex' }}>
          <Logo size={24} />
        </Link>
        <Link
          to="/#blog"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none' }}
        >
          <ArrowLeft size={14} /> All articles
        </Link>
      </header>

      {/* Article */}
      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '64px 32px 96px' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {post.tags.map(tag => (
            <span key={tag} style={{
              fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: tagColor(tag),
              background: `${tagColor(tag)}12`, border: `1px solid ${tagColor(tag)}22`,
              borderRadius: '999px', padding: '3px 10px',
            }}>{tag}</span>
          ))}
        </div>

        <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '16px' }}>
          {post.title}
        </h1>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '20px' }}>
          {post.summary}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '48px', paddingBottom: '32px', borderBottom: '1px solid var(--border)' }}>
          <Clock size={13} />
          <span>{post.read_minutes} min read · {formatDate(post.created_at)}</span>
        </div>

        <div style={{ fontSize: '1rem', color: 'var(--text-body)', lineHeight: 1.85, whiteSpace: 'pre-wrap' }}>
          {post.body}
        </div>

        <div style={{ marginTop: '64px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
          <Link
            to="/#blog"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}
          >
            <ArrowLeft size={14} /> Back to all articles
          </Link>
        </div>
      </main>
    </div>
  );
}
