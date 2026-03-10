
import { motion } from 'framer-motion';

const stats = [
  { value: '3+',   label: 'Partner Hospitals' },
  { value: '50+',  label: 'AI Startups Validated' },
  { value: '₹0',   label: 'Equity for Validation' },
  { value: '100%', label: 'Clinical-Grade Certification' },
];

const Hero = () => {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '96px',
    }}>
      {/* Ambient glow orbs */}
      <div className="hero-glow" style={{
        width: '700px', height: '700px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
        top: '-15%', left: '-10%',
      }} />
      <div className="hero-glow" style={{
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(245,158,11,0.11) 0%, transparent 70%)',
        top: '25%', right: '-8%',
        animationDelay: '3s',
      }} />
      <div className="hero-glow" style={{
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
        bottom: '5%', left: '35%',
        animationDelay: '6s',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '32px' }}
        >
          <span className="badge badge-indigo">
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#6366f1', display: 'inline-block', boxShadow: '0 0 8px #6366f1' }} />
            India's First Hospital-Embedded AI Innovation Hub
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(3.2rem, 6.5vw, 6.5rem)', maxWidth: '900px', marginBottom: '28px' }}
        >
          Validate Your AI.{' '}
          <span className="text-gradient-indigo">Inside a Real</span>
          <br />
          <span className="text-gradient-gold">Hospital.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '560px', marginBottom: '48px', lineHeight: 1.75 }}
        >
          We give startups, pharma companies, and clinicians the clinical access, validation framework, and certification to bring AI into healthcare — for real.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '80px' }}
        >
          <button className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1rem' }}
            onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Programs →
          </button>
          <button className="btn btn-ghost" style={{ padding: '16px 32px', fontSize: '1rem' }}
            onClick={() => document.getElementById('sandbox')?.scrollIntoView({ behavior: 'smooth' })}>
            Apply Now
          </button>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            gap: '0',
            flexWrap: 'wrap',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '40px',
          }}
        >
          {stats.map(({ value, label }, i) => (
            <div key={label} style={{
              flex: '1 1 160px',
              paddingRight: '40px',
              paddingLeft: i === 0 ? '0' : '40px',
              borderLeft: i === 0 ? 'none' : '1px solid var(--border-subtle)',
            }}>
              <div style={{
                fontFamily: 'Outfit', fontWeight: 900,
                fontSize: '2.5rem', letterSpacing: '-0.03em',
                color: 'var(--text-primary)', lineHeight: 1,
                marginBottom: '6px',
              }}>{value}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
