import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Start',
    price: 'Free',
    desc: 'Get started with clinical validation',
    features: [
      'Access to hospital network',
      'Basic clinical data access',
      'Community support',
      'Standard validation framework',
      'AI certification preparation',
    ],
    cta: 'Apply Now',
    popular: false,
  },
  {
    name: 'Scale',
    price: 'Custom',
    desc: 'For serious healthcare AI companies',
    features: [
      'Everything in Start',
      'Full clinical workflow access',
      'Priority hospital partnerships',
      'Fast-tracked certification',
      'Dedicated clinical advisor',
      'Custom research studies',
      'Investor introductions',
    ],
    cta: 'Contact Sales',
    popular: true,
  },
];

const Pricing = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="programs" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container" ref={ref}>
        <div className="section-header">
          <span className="eyebrow">Pricing</span>
          <h2>Simple, <span className="text-gradient">transparent</span> pricing</h2>
          <p>Scale as you go. No hidden fees.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="card"
              style={{
                padding: '40px 32px',
                position: 'relative',
                border: plan.popular ? '1px solid var(--border-accent)' : '1px solid var(--border-subtle)',
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--accent-primary)',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '6px 16px',
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Most Popular
                </div>
              )}

              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>
                  {plan.name}
                </h3>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>
                  {plan.price}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {plan.desc}
                </p>
              </div>

              <ul style={{ listStyle: 'none', marginBottom: '32px' }}>
                {plan.features.map((feature) => (
                  <li key={feature} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 0',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}>
                    <Check size={18} color="#10b981" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#sandbox"
                className={plan.popular ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
