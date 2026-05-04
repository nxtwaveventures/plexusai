import { motion } from 'framer-motion';
import { Brain, Activity, CalendarClock, Pill, Dna, ShieldAlert } from 'lucide-react';

const apps = [
  { title: 'Diagnostic Imaging AI', category: 'Radiology', desc: 'AI-powered X-ray and MRI analysis for early detection', Icon: Brain, color: '#0f172a' },
  { title: 'Patient Monitoring', category: 'Critical Care', desc: 'Real-time vital sign tracking and alert system', Icon: Activity, color: '#1d4ed8' },
  { title: 'Appointment Scheduler', category: 'Operations', desc: 'Smart scheduling with AI-driven resource allocation', Icon: CalendarClock, color: 'var(--accent)' },
  { title: 'Drug Interaction Checker', category: 'Pharmacy', desc: 'Automated prescription safety validation', Icon: Pill, color: '#7c3aed' },
  { title: 'Clinical Trial Match', category: 'Research', desc: 'AI matching patients to relevant clinical trials', Icon: Dna, color: '#059669' },
  { title: 'Triage Assistant', category: 'Emergency', desc: 'Intelligent patient prioritization for ER departments', Icon: ShieldAlert, color: '#dc2626' },
];

const Gallery = () => {
  return (
    <section className="section section-subtle" style={{ overflow: 'hidden' }}>
      <div className="container">
        <motion.div
          className="section-header centered"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">Built with PlexusAI</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Apps validated in real hospitals
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', maxWidth: '520px', margin: '0 auto' }}>
            Real AI tools, tested and validated in our partner hospitals.
          </p>
        </motion.div>
      </div>

      {/* Scrolling ticker */}
      <div style={{ position: 'relative', width: '100%', padding: '8px 0' }}>
        {/* Fade masks */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '120px', background: 'linear-gradient(to right, var(--bg-off-white), transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '120px', background: 'linear-gradient(to left, var(--bg-off-white), transparent)', zIndex: 2, pointerEvents: 'none' }} />

        <div className="animate-marquee" style={{ gap: '20px', paddingLeft: '20px' }}>
          {[...apps, ...apps].map((app, i) => (
            <motion.div
              key={`${app.title}-${i}`}
              className="card-light"
              style={{ width: '300px', flexShrink: 0, overflow: 'hidden', cursor: 'pointer' }}
            >
              {/* Header strip */}
              <div style={{
                height: '4px',
                background: app.color,
              }} />
              <div style={{ padding: '24px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: `${app.color}12`,
                  border: `1px solid ${app.color}22`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}>
                  <app.Icon size={22} color={app.color} />
                </div>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                  {app.category}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '8px' }}>
                  {app.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
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
