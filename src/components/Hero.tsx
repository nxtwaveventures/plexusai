
import { motion } from 'framer-motion';
import { Rocket, Activity, Database } from 'lucide-react';

const Hero = () => {
    return (
        <section className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
            <div className="bg-grid"></div>

            {/* Background glowing orbs */}
            <div className="glow-orb glow-cyan" style={{ width: '600px', height: '600px', top: '-20%', right: '-10%' }}></div>
            <div className="glow-orb glow-purple" style={{ width: '800px', height: '800px', bottom: '-30%', left: '-20%' }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
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
                        <button className="btn btn-outline" onClick={() => document.getElementById('focus-areas')?.scrollIntoView({ behavior: 'smooth' })}>
                            Explore Focus Areas
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Floating 3D-like elements */}
            <motion.div
                className="glass-panel animate-float delay-100"
                style={{ position: 'absolute', right: '10%', top: '25%', padding: '20px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '12px', background: '#ffffff' }}
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
                className="glass-panel animate-float delay-300"
                style={{ position: 'absolute', right: '25%', bottom: '20%', padding: '20px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '12px', background: '#ffffff' }}
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
