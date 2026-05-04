import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, ArrowRight, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Sandbox = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    startupName: '',
    founderName: '',
    email: '',
    innovationPillar: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await supabase.from('sandbox_applications').insert([{
        startup_name: formData.startupName,
        founder_name: formData.founderName,
        email: formData.email,
        innovation_pillar: formData.innovationPillar,
        description: formData.description,
      }]);
    } catch (error) {
      console.error('Submission error:', error);
    }
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsFormOpen(false);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ startupName: '', founderName: '', email: '', innovationPillar: '', description: '' });
      }, 500);
    }, 3000);
  };

  return (
    <>
      {/* CTA Banner */}
      <section id="sandbox" className="section" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}>
        <div className="container">
          <AnimatePresence mode="wait">
            {!isFormOpen ? (
              <motion.div
                key="cta"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}
              >
                <span className="badge badge-dark" style={{ marginBottom: '28px' }}>Innovation Sandbox</span>

                <h2 style={{
                  fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  color: '#ffffff',
                  marginBottom: '20px',
                }}>
                  Apply to the Sandbox
                </h2>

                <p style={{
                  fontSize: '1.1rem',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.7,
                  maxWidth: '480px',
                  margin: '0 auto 40px',
                }}>
                  Test and validate your AI inside real hospitals. We handle the rest.
                </p>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsFormOpen(true)}
                    style={{ gap: '10px' }}
                  >
                    Apply Now <ArrowRight size={16} />
                  </button>
                  <a href="#programs" className="btn btn-outline-white">
                    View Programs
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                style={{ maxWidth: '580px', margin: '0 auto' }}
              >
                <div style={{
                  background: '#ffffff',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '48px',
                }}>
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
                            Sandbox Application
                          </h3>
                          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                            Tell us about your innovation
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsFormOpen(false)}
                          style={{
                            background: 'none', border: '1px solid var(--border)', borderRadius: '6px',
                            width: '34px', height: '34px', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'var(--text-muted)', transition: 'all 200ms',
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.borderColor = 'var(--text-dark)';
                            (e.currentTarget as HTMLElement).style.color = 'var(--text-dark)';
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                            (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <input className="form-input" type="text" placeholder="Startup Name" required
                          value={formData.startupName} onChange={e => setFormData({ ...formData, startupName: e.target.value })} />
                        <input className="form-input" type="text" placeholder="Founder Name" required
                          value={formData.founderName} onChange={e => setFormData({ ...formData, founderName: e.target.value })} />
                      </div>

                      <input className="form-input" type="email" placeholder="Work Email" required
                        value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />

                      <select
                        className="form-input"
                        required
                        value={formData.innovationPillar}
                        onChange={e => setFormData({ ...formData, innovationPillar: e.target.value })}
                        style={{ appearance: 'none', cursor: 'pointer' }}
                      >
                        <option value="" disabled>Select Focus Area</option>
                        <option value="workflow">AI Clinical Workflow</option>
                        <option value="trials">Digital Health Trials</option>
                        <option value="rwe">Evidence Generation (RWE)</option>
                      </select>

                      <textarea
                        className="form-input"
                        placeholder="Briefly describe your technology and its clinical application..."
                        required
                        rows={4}
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        style={{ resize: 'vertical' }}
                      />

                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                        style={{ width: '100%', justifyContent: 'center', padding: '14px', opacity: isSubmitting ? 0.7 : 1 }}
                      >
                        {isSubmitting ? <Loader2 size={17} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={17} />}
                        {isSubmitting ? 'Submitting…' : 'Submit Application'}
                      </button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      style={{ textAlign: 'center', padding: '40px 20px' }}
                    >
                      <CheckCircle2 size={56} color="var(--accent)" style={{ margin: '0 auto 20px' }} />
                      <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '12px' }}>
                        Application Received
                      </h3>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.7 }}>
                        Our Clinical Validation Committee will review your submission and reach out shortly.
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default Sandbox;
