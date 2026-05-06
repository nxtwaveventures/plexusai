import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'What is PlexusAI?',
    a: "PlexusAI is India's first hospital-embedded AI validation hub. We give startups and pharma companies real hospital access to test, validate, and certify their AI.",
  },
  {
    q: 'Do I need healthcare experience?',
    a: 'No. You bring the AI. We provide clinical expertise, hospital access, and the validation framework.',
  },
  {
    q: 'What types of AI can be validated?',
    a: 'Diagnostic imaging, patient monitoring, clinical decisions, hospital operations, drug checks, and trial matching. If it is healthcare AI, we can validate it.',
  },
  {
    q: 'How does the clinical validation process work?',
    a: 'After acceptance, we place your AI in a partner hospital. You test it with real, de-identified data. Our clinical team guides you at every step.',
  },
  {
    q: 'What is the PlexusAI Certification?',
    a: "It is proof your AI works in a real hospital. Investors, regulators, and hospitals recognize it. It is the fastest path to adoption in India.",
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. All clinical data is de-identified and encrypted. We follow healthcare data protection standards.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section section-light">
      <div className="container">
        <div className="faq-layout" style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: '80px',
          alignItems: 'start',
        }}>
          {/* Left */}
          <div className="faq-sticky" style={{ position: 'sticky', top: '96px' }}>
            <span className="eyebrow">FAQ</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px', marginTop: '12px' }}>
              Frequently asked questions
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.65 }}>
              Can't find what you're looking for? Reach out to us directly.
            </p>
            <a
              href="mailto:support@plexusai.in"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent)',
                marginTop: '20px', transition: 'gap 200ms ease',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.gap = '9px'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.gap = '5px'}
            >
              support@plexusai.in →
            </a>
          </div>

          {/* Right: accordion */}
          <div>
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '22px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '16px',
                  }}
                >
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: openIndex === i ? 'var(--accent)' : 'var(--text-dark)',
                    transition: 'color 200ms',
                    lineHeight: 1.4,
                  }}>
                    {faq.q}
                  </span>
                  <div style={{ flexShrink: 0, color: openIndex === i ? 'var(--accent)' : 'var(--text-muted)' }}>
                    {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{
                        fontSize: '0.95rem',
                        color: 'var(--text-body)',
                        lineHeight: 1.7,
                        paddingBottom: '22px',
                        maxWidth: '620px',
                      }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
