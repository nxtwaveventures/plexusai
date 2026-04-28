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
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="features" className="section section-light">
      <div className="container" ref={ref}>
        <div className="section-header centered">
          <span className="eyebrow">Why PlexusAI</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Everything you need to build trusted healthcare AI
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', maxWidth: '500px', margin: '0 auto' }}>
            From validation to certification — get your AI into real clinical settings faster.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {features.map((feature, i) => {
            const { Icon } = feature;
            return (
              <motion.div
                key={feature.num}
                initial={{ opacity: 0, y: 28, scale: 0.97, filter: 'blur(4px)' }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="card-light"
                style={{ padding: '36px' }}
              >
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '20px', letterSpacing: '0.06em' }}>
                  {feature.num}
                </div>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(13,148,136,0.07)',
                  border: '1px solid rgba(13,148,136,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  <Icon size={22} color="var(--accent)" />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '10px', letterSpacing: '-0.01em' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.65 }}>
                  {feature.desc}
                </p>
                <div style={{ marginTop: '20px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Learn more →
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
