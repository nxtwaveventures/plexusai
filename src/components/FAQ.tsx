import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'What is PlexusAI?',
    a: "PlexusAI is India's first hospital-embedded AI innovation hub. We provide startups, pharma companies, and clinicians with clinical access, validation frameworks, and certification to bring AI into healthcare — for real.",
  },
  {
    q: 'Do I need healthcare experience?',
    a: 'No prior healthcare experience is required. We provide the clinical expertise, hospital access, and validation framework. You bring the AI technology — we help you validate it in real clinical settings.',
  },
  {
    q: 'What types of AI can be validated?',
    a: 'We support a wide range of healthcare AI applications including diagnostic imaging, patient monitoring, clinical decision support, hospital operations, drug interaction checking, and clinical trial matching.',
  },
  {
    q: 'How does the clinical validation process work?',
    a: "After acceptance, you'll get access to our partner hospital workflows where you can test your AI with real (de-identified) clinical data. Our clinical team will guide you through the validation framework and provide feedback.",
  },
  {
    q: 'What is the PlexusAI Certification?',
    a: "The PlexusAI Validation Certificate is India's most trusted clinical AI credential. It demonstrates that your AI has been validated inside real hospital workflows and meets clinical standards. This credential helps investors, regulators, and hospitals trust your technology.",
  },
  {
    q: 'Is my data secure?',
    a: 'Yes, we take data security very seriously. All clinical data is de-identified and handled according to healthcare data protection standards. We comply with all relevant healthcare regulations and use industry-standard encryption.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section section-light">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: '80px',
          alignItems: 'start',
        }}>
          {/* Left */}
          <div style={{ position: 'sticky', top: '96px' }}>
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
