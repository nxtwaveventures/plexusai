import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'What is PlexusAI?',
    a: 'PlexusAI is India\'s first hospital-embedded AI innovation hub. We provide startups, pharma companies, and clinicians with clinical access, validation frameworks, and certification to bring AI into healthcare — for real.',
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
    a: 'After acceptance, you\'ll get access to our partner hospital workflows where you can test your AI with real (de-identified) clinical data. Our clinical team will guide you through the validation framework and provide feedback.',
  },
  {
    q: 'What is the PlexusAI Certification?',
    a: 'The PlexusAI Validation Certificate is India\'s most trusted clinical AI credential. It demonstrates that your AI has been validated inside real hospital workflows and meets clinical standards. This credential helps investors, regulators, and hospitals trust your technology.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes, we take data security very seriously. All clinical data is de-identified and handled according to healthcare data protection standards. We comply with all relevant healthcare regulations and use industry-standard encryption.',
  },
];

const FAQ = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container" ref={ref}>
        <div className="section-header">
          <span className="eyebrow">FAQ</span>
          <h2>Frequently asked <span className="text-gradient">questions</span></h2>
        </div>

        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: openIndex === i ? 'var(--text-primary)' : 'var(--text-secondary)',
                }}>
                  {faq.q}
                </span>
                {openIndex === i ? (
                  <Minus size={20} color="var(--text-muted)" />
                ) : (
                  <Plus size={20} color="var(--text-muted)" />
                )}
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
                      color: 'var(--text-secondary)',
                      lineHeight: 1.7,
                      paddingBottom: '20px',
                    }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
