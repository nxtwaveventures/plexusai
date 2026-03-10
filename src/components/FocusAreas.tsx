
import { motion } from 'framer-motion';
import { Stethoscope, FileText, Landmark } from 'lucide-react';

const pillars = [
  {
    Icon: Stethoscope,
    accentColor: 'var(--accent-indigo)',
    accentBg: 'rgba(99,102,241,0.12)',
    borderColor: 'rgba(99,102,241,0.3)',
    tag: 'Clinical Intelligence',
    title: 'AI Clinical Workflow',
    desc: 'Deploying intelligence for discharge summaries, OPD documentation, and ICU early warning systems that save lives.',
  },
  {
    Icon: FileText,
    accentColor: 'var(--accent-gold)',
    accentBg: 'rgba(245,158,11,0.12)',
    borderColor: 'rgba(245,158,11,0.3)',
    tag: 'Research & Trials',
    title: 'Digital Health Trials',
    desc: 'Accelerating validation for wearables, AI diagnostics, and remote monitoring therapeutics with real-world evidence.',
  },
  {
    Icon: Landmark,
    accentColor: 'var(--accent-teal)',
    accentBg: 'rgba(20,184,166,0.12)',
    borderColor: 'rgba(20,184,166,0.3)',
    tag: 'HealthFinTech',
    title: 'MedFinTech Innovation',
    desc: 'Automating insurance claims, PMJ documentation, and pioneering longevity finance at the intersection of health and capital.',
  },
];

const FocusAreas = () => {
  return (
    <section className="section" id="focus-areas" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', bottom: 0, right: '-10%',
        width: '600px', height: '500px', pointerEvents: 'none',
        background: 'radial-gradient(ellipse, rgba(245,158,11,0.05) 0%, transparent 70%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header">
          <span className="eyebrow">What We Work On</span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', marginBottom: '20px' }}>
            Core{' '}
            <span className="text-gradient-gold">Focus Areas</span>
          </h2>
          <p className="text-secondary" style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            Transforming the intersection of clinical care, AI validation, and healthcare finance.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {pillars.map((p, i) => {
            const { Icon } = p;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="card"
                style={{
                  padding: '40px',
                  borderLeft: `3px solid ${p.borderColor}`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Top glow */}
                <div style={{
                  position: 'absolute', top: '-40px', right: '-40px',
                  width: '160px', height: '160px', borderRadius: '50%',
                  background: p.accentBg, filter: 'blur(40px)',
                  pointerEvents: 'none',
                }} />

                {/* Tag */}
                <div style={{
                  display: 'inline-block',
                  fontFamily: 'Outfit', fontWeight: 700, fontSize: '0.72rem',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: p.accentColor, marginBottom: '20px',
                }}>
                  {p.tag}
                </div>

                {/* Icon */}
                <div style={{
                  background: p.accentBg, borderRadius: '14px',
                  width: '56px', height: '56px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  marginBottom: '24px',
                }}>
                  <Icon size={28} color={p.accentColor} />
                </div>

                <h3 style={{ fontSize: '1.35rem', marginBottom: '12px', fontWeight: 800 }}>{p.title}</h3>
                <p className="text-secondary" style={{ lineHeight: 1.75, fontSize: '0.95rem' }}>{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;
