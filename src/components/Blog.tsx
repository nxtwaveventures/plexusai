import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

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
  'Clinical AI':        '#0D9488',
  'Validation':         '#2563EB',
  'Regulation':         '#7C3AED',
  'Diagnostics':        '#059669',
  'India':              '#D97706',
  'RWE':                '#DC2626',
  'Hospitals':          '#0D9488',
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

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<Post | null>(null);

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('id, created_at, title, summary, body, tags, read_minutes')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(6)
      .then(({ data }) => {
        setPosts(data ?? []);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (!posts.length) return null;

  return (
    <>
      <section id="blog" className="section section-subtle">
        <div className="container">
          <div className="section-header centered">
            <span className="eyebrow">Healthcare AI News</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px' }}>
              2-minute reads, every day
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', maxWidth: '480px', margin: '0 auto' }}>
              Our AI agents research, write, score, and review the most important healthcare AI news — so you don't have to.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="card-light"
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                onClick={() => setOpen(post)}
              >
                {/* Tags */}
                <div style={{ padding: '24px 24px 0', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {post.tags.slice(0, 2).map(tag => (
                    <span key={tag} style={{
                      fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em',
                      textTransform: 'uppercase', color: tagColor(tag),
                      background: `${tagColor(tag)}12`,
                      border: `1px solid ${tagColor(tag)}22`,
                      borderRadius: '999px', padding: '3px 10px',
                    }}>{tag}</span>
                  ))}
                </div>

                <div style={{ padding: '16px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1.35, marginBottom: '10px', letterSpacing: '-0.01em' }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.65, flex: 1 }}>
                    {post.summary}
                  </p>

                  <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      <Clock size={12} />
                      <span>{post.read_minutes} min read · {formatDate(post.created_at)}</span>
                    </div>
                    <ChevronRight size={16} color="var(--accent)" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Article modal */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setOpen(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              background: '#fff', borderRadius: '12px', maxWidth: '680px', width: '100%',
              maxHeight: '85vh', overflow: 'auto', padding: '48px',
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(null)}
              style={{
                position: 'absolute', top: '20px', right: '20px',
                background: 'none', border: '1px solid var(--border)', borderRadius: '6px',
                width: '34px', height: '34px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-muted)',
              }}
            >
              <X size={16} />
            </button>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {open.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: tagColor(tag),
                  background: `${tagColor(tag)}12`, border: `1px solid ${tagColor(tag)}22`,
                  borderRadius: '999px', padding: '3px 10px',
                }}>{tag}</span>
              ))}
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '12px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
              {open.title}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '28px' }}>
              <Clock size={13} />
              <span>{open.read_minutes} min read · {formatDate(open.created_at)}</span>
            </div>

            <div style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
              {open.body}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
