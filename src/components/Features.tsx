import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FlaskConical, Shield, Database, Zap } from 'lucide-react';

const features = [
  {
    num: '01',
    Icon: FlaskConical,
    title: 'Clinical Validation Access',
    desc: 'Test your AI inside real hospital workflows with live clinical data. Compress years of validation into months.',
  },
  {
    num: '02',
    Icon: Shield,
    title: 'Clinical Certification',
    desc: 'Get the credential that unlocks markets. Investors fund faster. Regulators clear smoother. Hospitals adopt what is certified.',
  },
  {
    num: '03',
    Icon: Database,
    title: 'Real-World Data',
    desc: 'Access de-identified patient data, clinical workflows, and hospital systems to train and validate your AI.',
  },
  {
    num: '04',
    Icon: Zap,
    title: 'Fast-Track to Market',
    desc: 'Skip the noise. Scale inside a hospital with direct access to clinicians, administrators, and our expert network.',
  },
];

const Features = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="focus-areas" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container" ref={ref}>
        <div className="section-header">
          <span className="eyebrow">Why PlexusAI</span>
          <h2>Everything you need to build <span className="text-gradient">trusted healthcare AI</span></h2>
          <p>From validation to certification — get your AI into real clinical settings faster.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {features.map((feature, i) => {
            const { Icon } = feature;
            return (
              <motion.div
                key={feature.num}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card"
                style={{ padding: '32px', cursor: 'default' }}
              >
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--accent-primary)',
                  marginBottom: '16px',
                  letterSpacing: '0.05em',
                }}>
                  {feature.num}
                </div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(99, 102, 241, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  <Icon size={24} color="#a5b4fc" />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
