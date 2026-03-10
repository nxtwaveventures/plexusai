import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
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
                .insert([
                    {
                        startup_name: formData.startupName,
                        founder_name: formData.founderName,
                        email: formData.email,
                        innovation_pillar: formData.innovationPillar,
                        description: formData.description
                    }
                ]);
        } catch (error) {
            console.error('Submission error:', error);
        }

        setIsSubmitting(false);
        setIsSubmitted(true);

        setTimeout(() => {
            setIsFormOpen(false);
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({
                    startupName: '',
                    founderName: '',
                    email: '',
                    innovationPillar: '',
                    description: ''
                });
            }, 500);
        }, 3000);
    };

    return (
        <footer className="section" id="sandbox" style={{ position: 'relative', overflow: 'hidden', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="glow-orb glow-cyan" style={{ width: '500px', height: '500px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.1 }}></div>

            <div className="container" style={{ width: '100%' }}>
                <AnimatePresence mode="wait">
                    {!isFormOpen ? (
                        <motion.div
                            key="cta"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                            transition={{ duration: 0.5 }}
                            className="glass-advanced"
                            style={{
                                padding: '80px 40px',
                                textAlign: 'center',
                                borderRadius: 'var(--border-radius-lg)',
                            }}
                        >
                            <div className="badge" style={{ marginBottom: '24px' }}>Innovation Summit & Sandbox</div>
                            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '24px' }}>
                                Ready to Validate <br /> Your <span className="text-gradient">MedTech Innovation?</span>
                            </h2>
                            <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto 40px auto', fontSize: '1.2rem' }}>
                                Join the Plexus AI MedTech Sandbox. Gain clinical testing access, real-world hospital deployment, and become part of our Global Partnership Program.
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                                <button className="btn btn-primary" onClick={() => setIsFormOpen(true)} style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
                                    Apply for Sandbox
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, type: 'spring' }}
                            className="glass-advanced"
                            style={{
                                padding: '60px',
                                maxWidth: '700px',
                                margin: '0 auto',
                                borderRadius: 'var(--border-radius-lg)',
                            }}
                        >
                            {!isSubmitted ? (
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                        <h3 style={{ fontSize: '2rem' }}>Sandbox Application</h3>
                                        <button type="button" onClick={() => setIsFormOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
                                    </div>

                                    <div style={{ display: 'flex', gap: '24px' }}>
                                        <input type="text" placeholder="Startup Name" required style={inputStyle} value={formData.startupName} onChange={(e) => setFormData({ ...formData, startupName: e.target.value })} />
                                        <input type="text" placeholder="Founder Name" required style={inputStyle} value={formData.founderName} onChange={(e) => setFormData({ ...formData, founderName: e.target.value })} />
                                    </div>
                                    <input type="email" placeholder="Work Email" required style={inputStyle} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

                                    <select required style={{ ...inputStyle, appearance: 'none', color: 'var(--text-secondary)' }} value={formData.innovationPillar} onChange={(e) => setFormData({ ...formData, innovationPillar: e.target.value })}>
                                        <option value="" disabled>Select Innovation Pillar</option>
                                        <option value="workflow">AI Clinical Workflow</option>
                                        <option value="trials">Digital Health Trials</option>
                                        <option value="medfintech">MedFinTech</option>
                                    </select>

                                    <textarea placeholder="Briefly describe your technology..." required rows={4} style={{ ...inputStyle, resize: 'vertical' }} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />

                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%', marginTop: '16px', padding: '16px', opacity: isSubmitting ? 0.7 : 1 }}>
                                        {isSubmitting ? <Loader2 size={18} className="animate-pulse" /> : <Send size={18} />}
                                        {isSubmitting ? ' Submitting...' : ' Submit Application'}
                                    </button>
                                </form>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    style={{ textAlign: 'center', padding: '60px 20px' }}
                                >
                                    <CheckCircle2 size={80} color="var(--accent-cyan)" style={{ margin: '0 auto 24px auto', display: 'block' }} />
                                    <h3 style={{ fontSize: '2.5rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Application Received</h3>
                                    <p className="text-secondary" style={{ fontSize: '1.2rem' }}>Our Clinical Validation Committee will review your submission and contact you shortly.</p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div style={{ marginTop: 'auto', textAlign: 'center', borderTop: '1px solid var(--border-glass)', paddingTop: '40px', color: 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                        <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '1.5rem', color: 'var(--text-primary)' }}>
                            Plexus AI <span style={{ color: 'var(--accent-cyan)' }}>COE</span>
                        </div>
                        <div style={{ fontSize: '0.875rem' }}>
                            &copy; {new Date().getFullYear()} Plexus AI Innovation Hub. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    background: '#ffffff',
    border: '1px solid var(--border-glass-hover)',
    borderRadius: '12px',
    color: 'var(--text-primary)',
    fontSize: '1rem',
    fontFamily: 'Inter',
    outline: 'none',
    transition: 'var(--transition-fast)',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
};

const styleTag = document.createElement('style');
styleTag.innerHTML = `
    input:focus, select:focus, textarea:focus {
        border-color: var(--accent-cyan) !important;
        box-shadow: 0 0 15px rgba(255, 184, 0, 0.1);
    }
`;
document.head.appendChild(styleTag);

export default Sandbox;
