
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
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
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await supabase
        .from('sandbox_applications')
        .insert([{
          startup_name: formData.startupName,
          founder_name: formData.founderName,
          email: formData.email,
          innovation_pillar: formData.innovationPillar,
          description: formData.description
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
    <footer id="sandbox" style={{
      position: 'relative', overflow: 'hidden',
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-subtle)',
    }}>
      {/* Ambient glows */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '800px', height: '500px', pointerEvents: 'none',
        background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 65%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '120px', paddingBottom: '60px' }}>
        <AnimatePresence mode="wait">
          {!isFormOpen ? (
            /* ── CTA Panel ── */
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto', paddingBottom: '80px' }}
            >
              <span className="badge badge-indigo" style={{ marginBottom: '32px' }}>Innovation Sandbox</span>

              <h2 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', marginBottom: '24px', lineHeight: 1.05 }}>
                Ready to Validate<br />
                Your{' '}
                <span className="text-gradient-gold">MedTech Innovation?</span>
              </h2>

              <p className="text-secondary" style={{ fontSize: '1.15rem', maxWidth: '540px', margin: '0 auto 48px auto', lineHeight: 1.75 }}>
                Join the Plexus AI MedTech Sandbox. Get clinical testing access, real-world hospital deployment, and a place in our Global Partnership Program.
              </p>

              <button
                className="btn btn-gold"
                onClick={() => setIsFormOpen(true)}
                style={{ padding: '18px 48px', fontSize: '1.05rem', gap: '10px' }}
              >
                Apply Now <ArrowRight size={18} />
              </button>
            </motion.div>
          ) : (
            /* ── Application Form ── */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ maxWidth: '640px', margin: '0 auto', paddingBottom: '80px' }}
            >
              <div style={{
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)', padding: '56px',
              }}>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Form header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.75rem', marginBottom: '6px' }}>Sandbox Application</h3>
                        <p className="text-secondary" style={{ fontSize: '0.9rem' }}>Tell us about your innovation</p>
                      </div>
                      <button type="button" onClick={() => setIsFormOpen(false)} style={{
                        background: 'var(--bg-card-hover)', border: '1px solid var(--border-subtle)',
                        borderRadius: '8px', color: 'var(--text-muted)', cursor: 'pointer',
                        width: '36px', height: '36px', fontSize: '1rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'var(--ease-out)',
                      }}>✕</button>
                    </div>

                    {/* Row: Startup + Founder */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Startup Name"
                        required
                        value={formData.startupName}
                        onChange={e => setFormData({ ...formData, startupName: e.target.value })}
                      />
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Founder Name"
                        required
                        value={formData.founderName}
                        onChange={e => setFormData({ ...formData, founderName: e.target.value })}
                      />
                    </div>

                    <input
                      className="form-input"
                      type="email"
                      placeholder="Work Email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />

                    <select
                      className="form-input"
                      required
                      value={formData.innovationPillar}
                      onChange={e => setFormData({ ...formData, innovationPillar: e.target.value })}
                      style={{ appearance: 'none', cursor: 'pointer', }}
                    >
                      <option value="" disabled>Select Innovation Pillar</option>
                      <option value="workflow">AI Clinical Workflow</option>
                      <option value="trials">Digital Health Trials</option>
                      <option value="medfintech">MedFinTech</option>
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
                      style={{ width: '100%', padding: '16px', fontSize: '1rem', marginTop: '4px', opacity: isSubmitting ? 0.7 : 1 }}
                    >
                      {isSubmitting ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={18} />}
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ textAlign: 'center', padding: '40px 20px' }}
                  >
                    <div style={{ marginBottom: '24px' }}>
                      <CheckCircle2 size={64} color="var(--accent-indigo)" style={{ margin: '0 auto' }} />
                    </div>
                    <h3 style={{ fontSize: '2rem', marginBottom: '12px' }}>Application Received</h3>
                    <p className="text-secondary" style={{ fontSize: '1rem', lineHeight: 1.75 }}>
                      Our Clinical Validation Committee will review your submission and reach out shortly.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer bar */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
            PLEXUS<span style={{ color: 'var(--accent-indigo)' }}>AI</span>{' '}
            <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>COE</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Plexus AI Innovation Hub. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Sandbox;
