
import { motion } from 'framer-motion';
import { Rocket, Activity, Database } from 'lucide-react';
import heroBg from '../assets/hero-bg.png';

const Hero = () => {
    return (
        <section className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
            <div className="bg-grid"></div>
            <div className="bg-mesh"></div>

            <div className="container" style={{ position: 'relative', zIndex: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{ maxWidth: '800px' }}
                >
                    <div className="badge animate-pulse">
                        <span style={{ marginRight: '8px' }}>●</span> Launching The Future of Healthcare
                    </div>

                    <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 1.1, marginBottom: '24px' }}>
                        <span style={{ display: 'block' }}>India's First</span>
                        <span className="text-gradient-accent">Hospital-Embedded</span>
                        <span style={{ display: 'block' }}>Healthcare AI Hub</span>
                    </h1>

                    <p className="text-secondary" style={{ fontSize: '1.25rem', marginBottom: '40px', maxWidth: '600px' }}>
                        Validating the next generation of clinical AI, digital health trials, and MedFinTech innovation directly inside real hospital workflows.
                    </p>

                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        <button className="btn btn-primary" onClick={() => document.getElementById('sandbox')?.scrollIntoView({ behavior: 'smooth' })}>
                            <Rocket size={20} />
                            Join the Hub
                        </button>
                        <button className="btn btn-outline" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)' }} onClick={() => document.getElementById('focus-areas')?.scrollIntoView({ behavior: 'smooth' })}>
                            Explore Focus Areas
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                    style={{ position: 'relative', perspective: '1000px' }}
                >
                    <div className="glass-advanced" style={{ padding: '16px', borderRadius: '32px', transformStyle: 'preserve-3d' }}>
                        <img
                            src={heroBg}
                            alt="Healthcare AI Innovation"
                            style={{ width: '100%', height: 'auto', borderRadius: '24px', objectFit: 'cover', display: 'block', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Floating 3D-like elements */}
            <motion.div
                className="glass-advanced animate-float delay-100"
                style={{ position: 'absolute', right: '45%', top: '20%', padding: '20px', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 20 }}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <div style={{ background: 'rgba(255, 184, 0, 0.1)', padding: '12px', borderRadius: '50%' }}>
                    <Activity color="var(--accent-cyan)" />
                </div>
                <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Live Vitals</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>AI Early Warning</div>
                </div>
            </motion.div>

            <motion.div
                className="glass-advanced animate-float delay-300"
                style={{ position: 'absolute', left: '45%', bottom: '20%', padding: '20px', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 20 }}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
            >
                <div style={{ background: 'rgba(14, 165, 233, 0.1)', padding: '12px', borderRadius: '50%' }}>
                    <Database color="var(--accent-purple)" />
                </div>
                <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Documentation</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>LLM Summaries</div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
