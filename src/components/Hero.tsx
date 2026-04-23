import { motion, useInView, animate, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import MagneticButton from './MagneticButton';

/* ── Animated count-up for stats ──────────────────────── */
const useCountUp = (target: number, duration = 1.4, inView = false) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setValue(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, target, duration]);
  return value;
};

const StatItem = ({ value, suffix, label, inView }: { value: number; suffix: string; label: string; inView: boolean }) => {
  const count = useCountUp(value, 1.2, inView);
  return (
    <div>
      <div style={{ fontSize: '1.9rem', fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px', fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
};

/* ── Word-by-word headline reveal ─────────────────────── */
const RevealText = ({ text, delay = 0 }: { text: string; delay?: number }) => (
  <span style={{ display: 'inline-block' }}>
    {text.split(' ').map((word, i) => (
      <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.28em' }}>
        <motion.span
          initial={{ y: '105%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration: 0.65, delay: delay + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      </span>
    ))}
  </span>
);

/* ── Animated mesh gradient blobs ─────────────────────── */
const MeshBackground = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
    {/* Blob 1 – top right violet */}
    <motion.div
      animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.95, 1] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute', top: '-10%', right: '5%',
        width: '520px', height: '520px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,53,217,0.09) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }}
    />
    {/* Blob 2 – bottom left soft magenta */}
    <motion.div
      animate={{ x: [0, -25, 40, 0], y: [0, 30, -30, 0], scale: [1, 0.9, 1.05, 1] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      style={{
        position: 'absolute', bottom: '0%', left: '-5%',
        width: '480px', height: '480px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)',
        filter: 'blur(50px)',
      }}
    />
    {/* Blob 3 – center faint indigo */}
    <motion.div
      animate={{ scale: [1, 1.15, 0.9, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      style={{
        position: 'absolute', top: '30%', left: '40%',
        width: '360px', height: '360px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,37,187,0.05) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }}
    />
    {/* Subtle grid pattern */}
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `
        linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)
      `,
      backgroundSize: '48px 48px',
    }} />
  </div>
);

const Hero = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-40px' });

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0px', '80px']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={heroRef} style={{
      background: 'var(--bg-white)',
      paddingTop: '144px',
      paddingBottom: 'var(--s8)',
      borderBottom: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <MeshBackground />

      <motion.div
        className="container"
        style={{ position: 'relative', zIndex: 1, y: contentY, opacity: contentOpacity }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}>
          {/* ── Left ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: '28px' }}
            >
              <span className="badge badge-accent">India's First Hospital-Embedded AI Hub</span>
            </motion.div>

            <h1 style={{
              fontSize: 'clamp(2.8rem, 5vw, 4.4rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: 'var(--text-dark)',
              marginBottom: '28px',
            }}>
              <RevealText text="Validated" delay={0.1} />
              <br />
              <RevealText text="Intelligence" delay={0.2} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                fontSize: '1.1rem',
                color: 'var(--text-body)',
                lineHeight: 1.7,
                maxWidth: '420px',
                marginBottom: '40px',
              }}
            >
              Improving patient outcomes with hospital-grade AI. Test, validate, and certify your healthcare AI inside real clinical workflows.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}
            >
              <MagneticButton href="#sandbox" className="btn btn-primary">Apply Now</MagneticButton>
              <MagneticButton href="#features" className="btn btn-outline">Learn More</MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{
                display: 'flex',
                gap: '40px',
                marginTop: '56px',
                paddingTop: '32px',
                borderTop: '1px solid var(--border)',
              }}
            >
              <StatItem value={3} suffix="+" label="Partner Hospitals" inView={statsInView} />
              <StatItem value={50} suffix="+" label="AI Startups Validated" inView={statsInView} />
              <StatItem value={100} suffix="%" label="Clinical-Grade Certified" inView={statsInView} />
            </motion.div>
          </div>

          {/* ── Right panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'rgba(247,247,245,0.8)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '40px',
              position: 'relative',
              overflow: 'hidden',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--accent)' }} />

            <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Innovation Pillars
            </div>

            {[
              { num: '01', label: 'AI Clinical Workflow', desc: 'Discharge summaries, OPD docs, ICU alerts' },
              { num: '02', label: 'Digital Health Trials', desc: 'Wearables, diagnostics, remote monitoring' },
              { num: '03', label: 'MedFinTech Innovation', desc: 'Claims automation, longevity finance' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '16px 0',
                  borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'var(--bg-white)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent)',
                }}>
                  {item.num}
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '3px' }}>{item.label}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                </div>
              </motion.div>
            ))}

            <motion.a
              href="#sandbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent)',
                marginTop: '20px', transition: 'gap 200ms ease',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.gap = '10px'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.gap = '6px'}
            >
              Join the Sandbox →
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
