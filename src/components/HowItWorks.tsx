import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { UserCheck, Stethoscope, BarChart3, Award, Rocket } from 'lucide-react';

const steps = [
  {
    num: '01',
    Icon: UserCheck,
    title: 'Partner Onboarding',
    desc: 'We agree on scope and align with your clinical team.',
    color: '#0D9488',
    bg: 'rgba(13,148,136,0.08)',
    border: 'rgba(13,148,136,0.15)',
  },
  {
    num: '02',
    Icon: Stethoscope,
    title: 'Clinical Deployment',
    desc: 'We integrate your AI into live OPD, ICU, and diagnostic workflows inside partner hospitals.',
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.15)',
  },
  {
    num: '03',
    Icon: BarChart3,
    title: 'Evidence Capture',
    desc: 'We track usage, outcomes, and efficiency in real time. Clinicians give direct feedback.',
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.15)',
  },
  {
    num: '04',
    Icon: Award,
    title: 'Validation & Certification',
    desc: 'You get a published RWE report, a regulatory dossier, and the PlexusAI Validation Certificate.',
    color: '#059669',
    bg: 'rgba(5,150,105,0.08)',
    border: 'rgba(5,150,105,0.15)',
  },
  {
    num: '05',
    Icon: Rocket,
    title: 'Scale & Expand',
    desc: 'We help you scale across hospitals with investor-ready evidence and our full partner network.',
    color: '#0D9488',
    bg: 'rgba(13,148,136,0.08)',
    border: 'rgba(13,148,136,0.15)',
  },
];

const HowItWorks = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="how-it-works" className="section section-subtle">
      <div className="container" ref={ref}>
        <div className="section-header centered">
          <span className="eyebrow">The Process</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            From idea to clinical proof — in months, not years
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', maxWidth: '520px', margin: '0 auto' }}>
            Five steps. We take your AI from submission to certified and deployed.
          </p>
        </div>

        {/* Steps */}
        <div className="hiw-steps" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '0',
          position: 'relative',
          marginTop: '16px',
        }}>
          {/* Connecting line */}
          <div className="hiw-connector" style={{
            position: 'absolute',
            top: '40px',
            left: 'calc(10% + 20px)',
            right: 'calc(10% + 20px)',
            height: '2px',
            background: 'var(--border)',
            zIndex: 0,
          }} />

          {steps.map((step, i) => {
            const { Icon } = step;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '0 12px',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Icon circle */}
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: step.bg,
                  border: `2px solid ${step.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px',
                  position: 'relative',
                  boxShadow: '0 0 0 6px var(--bg-off-white)',
                }}>
                  <Icon size={26} color={step.color} />
                  {/* Step number */}
                  <div style={{
                    position: 'absolute', top: '-6px', right: '-6px',
                    width: '22px', height: '22px', borderRadius: '50%',
                    background: step.color, color: '#fff',
                    fontSize: '0.62rem', fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 0 2px var(--bg-off-white)',
                  }}>
                    {i + 1}
                  </div>
                </div>

                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '8px', lineHeight: 1.3 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="hiw-cta"
          style={{
            marginTop: '56px',
            padding: '32px 40px',
            background: 'var(--bg-white)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '4px' }}>
              Ready to validate your AI?
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-body)' }}>
              Now accepting AI startups, MedTech companies, and pharma partners for Q2 2026.
            </div>
          </div>
          <a href="#sandbox" className="btn btn-primary" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
            Apply Now →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
