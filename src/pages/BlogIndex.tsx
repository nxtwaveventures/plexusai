import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Logo from '../components/Logo';

interface Post {
  id: string;
  created_at: string;
  title: string;
  summary: string;
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
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function imageUrl(title: string, id: string) {
  const seed = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 9999;
  const prompt = encodeURIComponent(`${title}, healthcare technology, India, cinematic, editorial photography, teal blue`);
  return `https://image.pollinations.ai/prompt/${prompt}?width=800&height=420&nologo=true&seed=${seed}`;
}

export default function BlogIndex() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('id, created_at, title, summary, tags, read_minutes')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(30)
      .then(({ data }) => {
        setPosts(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid var(--border)', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'inline-flex' }}>
          <Logo size={24} />
        </Link>
        <Link to="/" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
          ← Back to site
        </Link>
      </header>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '72px 32px 48px' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: '14px' }}>
          AI Pulse
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-dark)', letterSpacing: '-0.03em', marginBottom: '16px' }}>
          Healthcare AI News
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', maxWidth: '480px', margin: '0 auto' }}>
          2-minute reads, written and reviewed by AI — delivered every morning.
        </p>
      </div>

      {/* Articles */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px 96px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '64px 0' }}>Loading…</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  to={`/blog/${post.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-light"
                  style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', height: '100%', overflow: 'hidden' }}
                >
                  {/* AI generated image */}
                  <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden', background: '#f0faf9' }}>
                    <img
                      src={imageUrl(post.title, post.id)}
                      alt={post.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 400ms ease', display: 'block' }}
                      onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'}
                      onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'}
                    />
                    {/* Tag overlay */}
                    <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} style={{
                          fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
                          textTransform: 'uppercase', color: '#fff',
                          background: tagColor(tag),
                          borderRadius: '999px', padding: '3px 10px',
                        }}>{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ padding: '20px 22px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1.35, marginBottom: '8px', letterSpacing: '-0.01em' }}>
                      {post.title}
                    </h2>
                    <p style={{ fontSize: '0.87rem', color: 'var(--text-body)', lineHeight: 1.65, flex: 1 }}>
                      {post.summary}
                    </p>
                    <div style={{ marginTop: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        <Clock size={12} />
                        <span>{post.read_minutes} min · {formatDate(post.created_at)}</span>
                      </div>
                      <ArrowRight size={15} color="var(--accent)" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
