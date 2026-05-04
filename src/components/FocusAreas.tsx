import { motion } from 'framer-motion';
import { Stethoscope, FileText, BarChart3 } from 'lucide-react';

const pillars = [
  {
    Icon: Stethoscope,
    tag: 'Clinical Intelligence',
    title: 'AI Clinical Workflow',
    desc: 'We deploy AI for discharge summaries, OPD notes, ICU alerts, and clinical decisions. Less burden on doctors. Better outcomes for patients.',
    accent: 'var(--accent)',
    accentBg: 'rgba(13,148,136,0.07)',
    accentBorder: 'rgba(13,148,136,0.15)',
  },
  {
    Icon: FileText,
    tag: 'Research & Trials',
    title: 'Digital Health Trials',
    desc: 'We run structured trials for wearables, AI diagnostics, and remote monitoring. You get publishable evidence and full ethical compliance.',
    accent: '#2563eb',
    accentBg: 'rgba(37,99,235,0.07)',
    accentBorder: 'rgba(37,99,235,0.15)',
  },
  {
    Icon: BarChart3,
    tag: 'Regulatory Validation',
    title: 'Evidence Generation (RWE)',
    desc: 'We generate publishable real-world evidence for CDSCO approval, investors, and hospital adoption across multiple centres.',
    accent: '#059669',
    accentBg: 'rgba(5,150,105,0.07)',
    accentBorder: 'rgba(5,150,105,0.15)',
  },
];

const FocusAreas = () => {
  return (
    <section className="section section-subtle" id="focus-areas">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: '80px',
          alignItems: 'start',
        }}>
          {/* Left: sticky header */}
          <div style={{ position: 'sticky', top: '96px' }}>
            <span className="eyebrow">What We Work On</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '20px', marginTop: '12px' }}>
              Core Focus Areas
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-body)', lineHeight: 1.75, marginBottom: '32px' }}>
              We work in three areas of hospital AI — from daily clinical workflows to regulatory approval.
            </p>
            <a href="#programs" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--accent)',
              transition: 'gap 200ms ease',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.gap = '10px'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.gap = '6px'}
            >
              View all programs →
            </a>
          </div>

          {/* Right: cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {pillars.map((p, i) => {
              const { Icon } = p;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="card-light"
                  style={{ padding: '36px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}
                >
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '12px',
                    background: p.accentBg,
                    border: `1px solid ${p.accentBorder}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={24} color={p.accent} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: p.accent, marginBottom: '8px' }}>
                      {p.tag}
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '10px', letterSpacing: '-0.01em' }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.7 }}>
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;
