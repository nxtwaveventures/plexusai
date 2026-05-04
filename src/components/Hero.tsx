import { motion, useInView, animate, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import MagneticButton from './MagneticButton';

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
      <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px', fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
};

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

const MeshBackground = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
    <motion.div
      animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.95, 1] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute', top: '-10%', right: '5%',
        width: '520px', height: '520px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(13,148,136,0.07) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }}
    />
    <motion.div
      animate={{ x: [0, -25, 40, 0], y: [0, 30, -30, 0], scale: [1, 0.9, 1.05, 1] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      style={{
        position: 'absolute', bottom: '0%', left: '-5%',
        width: '480px', height: '480px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)',
        filter: 'blur(50px)',
      }}
    />
    <motion.div
      animate={{ scale: [1, 1.15, 0.9, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      style={{
        position: 'absolute', top: '30%', left: '40%',
        width: '360px', height: '360px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(5,150,105,0.04) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }}
    />
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `
        linear-gradient(rgba(0,0,0,0.018) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,0,0,0.018) 1px, transparent 1px)
      `,
      backgroundSize: '48px 48px',
    }} />
  </div>
);

const steps = [
  { num: '01', label: 'Onboard', desc: 'Intake, scope & partner alignment' },
  { num: '02', label: 'Deploy', desc: 'Real OPD / IPD / ICU integration' },
  { num: '03', label: 'Validate', desc: 'Clinician feedback & RWE capture' },
  { num: '04', label: 'Certify', desc: 'Regulatory dossier & publication' },
];

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
              <span className="badge badge-accent">India's First Hospital-Embedded AI Validation Hub</span>
            </motion.div>

            <h1 style={{
              fontSize: 'clamp(2.8rem, 5vw, 4.4rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: 'var(--text-dark)',
              marginBottom: '28px',
            }}>
              <RevealText text="We Test and Validate AI in Hospitals." delay={0.1} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                fontSize: '1.1rem',
                color: 'var(--text-body)',
                lineHeight: 1.75,
                maxWidth: '420px',
                marginBottom: '40px',
              }}
            >
              Bring your AI. We run it inside real hospital workflows, collect the evidence, and certify it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}
            >
              <MagneticButton href="#sandbox" className="btn btn-primary">Apply to the Sandbox</MagneticButton>
              <MagneticButton href="#how-it-works" className="btn btn-outline">See How It Works</MagneticButton>
            </motion.div>

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
              <StatItem value={5} suffix="+" label="Hospital Partners" inView={statsInView} />
              <StatItem value={10} suffix="+" label="AI Tools Validated" inView={statsInView} />
              <StatItem value={3} suffix="+" label="RWE Publications" inView={statsInView} />
            </motion.div>
          </div>

          {/* ── Right panel: Validation Journey ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--bg-off-white)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '36px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* top teal strip */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--accent)' }} />

            <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '24px' }}>
              The Validation Journey
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}
                >
                  {/* Line + dot */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      background: i === 0 ? 'var(--accent)' : i < 2 ? 'rgba(13,148,136,0.12)' : 'var(--bg-white)',
                      border: i < 2 ? '2px solid var(--accent)' : '2px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.68rem', fontWeight: 800,
                      color: i === 0 ? '#fff' : i < 2 ? 'var(--accent)' : 'var(--text-muted)',
                    }}>
                      {step.num}
                    </div>
                    {i < steps.length - 1 && (
                      <div style={{
                        width: '2px', height: '28px',
                        background: i < 1 ? 'var(--accent)' : 'var(--border)',
                        margin: '4px 0',
                      }} />
                    )}
                  </div>

                  <div style={{ paddingBottom: i < steps.length - 1 ? '0' : '0', paddingTop: '4px' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: i < 2 ? 'var(--text-dark)' : 'var(--text-muted)', marginBottom: '2px' }}>
                      {step.label}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: i < steps.length - 1 ? '0' : '0' }}>
                      {step.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              style={{
                marginTop: '28px',
                paddingTop: '20px',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 0 3px rgba(16,185,129,0.2)' }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Accepting partners for Q2 2026
                </span>
              </div>
              <motion.a
                href="#sandbox"
                style={{
                  fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent)',
                  display: 'flex', alignItems: 'center', gap: '4px',
                  transition: 'gap 200ms ease',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.gap = '8px'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.gap = '4px'}
              >
                Apply →
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
