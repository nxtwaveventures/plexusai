import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

import { Brain, Activity, CalendarClock, Pill, Dna, ShieldAlert } from 'lucide-react';

const apps = [
  {
    title: 'Diagnostic Imaging AI',
    category: 'Radiology',
    desc: 'AI-powered X-ray and MRI analysis for early detection',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    Icon: Brain,
  },
  {
    title: 'Patient Monitoring',
    category: 'Critical Care',
    desc: 'Real-time vital sign tracking and alert system',
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
    Icon: Activity,
  },
  {
    title: 'Appointment Scheduler',
    category: 'Operations',
    desc: 'Smart scheduling with AI-driven resource allocation',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    Icon: CalendarClock,
  },
  {
    title: 'Drug Interaction Checker',
    category: 'Pharmacy',
    desc: 'Automated prescription safety validation',
    gradient: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
    Icon: Pill,
  },
  {
    title: 'Clinical Trial Match',
    category: 'Research',
    desc: 'AI matching patients to relevant clinical trials',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
    Icon: Dna,
  },
  {
    title: 'Triage Assistant',
    category: 'Emergency',
    desc: 'Intelligent patient prioritization for ER departments',
    gradient: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
    Icon: ShieldAlert,
  },
];

const Gallery = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section" style={{ background: 'var(--bg-primary)', overflow: 'hidden' }}>
      <div className="container" ref={ref}>
        <div className="section-header">
          <span className="eyebrow">Built with PlexusAI</span>
          <h2>Apps validated in <span className="text-gradient">real hospitals</span></h2>
          <p>See what startups have built and validated inside our partner hospital network.</p>
        </div>
      </div>

      {/* Infinite scrolling ticker */}
      <div style={{
        position: 'relative',
        width: '100%',
        padding: '20px 0',
      }}>
        {/* Left and right gradient masks for fade effect */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: 0, width: '100px',
          background: 'linear-gradient(to right, var(--bg-primary), transparent)',
          zIndex: 2, pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', top: 0, bottom: 0, right: 0, width: '100px',
          background: 'linear-gradient(to left, var(--bg-primary), transparent)',
          zIndex: 2, pointerEvents: 'none'
        }} />

        <div className="animate-marquee" style={{ gap: '24px', paddingLeft: '24px' }}>
          {[...apps, ...apps].map((app, i) => (
            <motion.div
              key={`${app.title}-${i}`}
              className="card"
              style={{
                width: '320px',
                flexShrink: 0,
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <div style={{
                height: '160px',
                background: app.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.2)',
                }} />
                {/* App Logo */}
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '20px',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 2,
                  boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                }}>
                  <app.Icon size={36} color="#000000" />
                </div>
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '8px',
                }}>
                  {app.category}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>
                  {app.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {app.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
