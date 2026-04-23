import { motion } from 'framer-motion';
import { Stethoscope, FileText, Landmark } from 'lucide-react';

const pillars = [
  {
    Icon: Stethoscope,
    tag: 'Clinical Intelligence',
    title: 'AI Clinical Workflow',
    desc: 'Deploying intelligence for discharge summaries, OPD documentation, and ICU early warning systems that save lives.',
    accent: 'var(--accent)',
    accentBg: 'rgba(123,53,217,0.07)',
    accentBorder: 'rgba(123,53,217,0.12)',
  },
  {
    Icon: FileText,
    tag: 'Research & Trials',
    title: 'Digital Health Trials',
    desc: 'Accelerating validation for wearables, AI diagnostics, and remote monitoring therapeutics with real-world evidence.',
    accent: '#2563eb',
    accentBg: 'rgba(37,99,235,0.07)',
    accentBorder: 'rgba(37,99,235,0.12)',
  },
  {
    Icon: Landmark,
    tag: 'HealthFinTech',
    title: 'MedFinTech Innovation',
    desc: 'Automating insurance claims, PMJ documentation, and pioneering longevity finance at the intersection of health and capital.',
    accent: '#059669',
    accentBg: 'rgba(5,150,105,0.07)',
    accentBorder: 'rgba(5,150,105,0.12)',
  },
];

const FocusAreas = () => {
  return (
    <section className="section section-subtle" id="focus-areas">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '340px 1fr',
          gap: '80px',
          alignItems: 'start',
        }}>
          {/* Left: sticky header */}
          <div style={{ position: 'sticky', top: '96px' }}>
            <span className="eyebrow">What We Work On</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '20px', marginTop: '12px' }}>
              Core Focus Areas
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '32px' }}>
              Transforming the intersection of clinical care, AI validation, and healthcare finance.
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
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    background: p.accentBg,
                    border: `1px solid ${p.accentBorder}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={24} color={p.accent} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: p.accent, marginBottom: '8px' }}>
                      {p.tag}
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '10px', letterSpacing: '-0.01em' }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.65 }}>
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
