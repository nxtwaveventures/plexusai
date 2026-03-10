
import { motion } from 'framer-motion';
import { Stethoscope, FileText, Landmark } from 'lucide-react';

const pillars = [
    {
        id: 1,
        title: 'AI Clinical Workflow',
        desc: 'Deploying intelligence for discharge summaries, OPD notes, and ICU early warning systems.',
        icon: <Stethoscope size={32} color="var(--accent-cyan)" />,
        glow: 'rgba(255, 184, 0, 0.15)'
    },
    {
        id: 2,
        title: 'Digital Health Trials',
        desc: 'Accelerating validation for wearables, AI diagnostics, and remote monitoring therapeutics.',
        icon: <FileText size={32} color="var(--accent-blue)" />,
        glow: 'rgba(249, 115, 22, 0.15)'
    },
    {
        id: 3,
        title: 'MedFinTech Innovation',
        desc: 'Automating insurance claims, PMJ documentation, and exploring longevity finance.',
        icon: <Landmark size={32} color="var(--accent-purple)" />,
        glow: 'rgba(14, 165, 233, 0.15)'
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const FocusAreas = () => {
    return (
        <section className="section" id="focus-areas" style={{ position: 'relative' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px' }}>
                        Core <span className="text-gradient">Focus Areas</span>
                    </h2>
                    <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem' }}>
                        Transforming the intersection of clinical care, validation, and healthcare finance.
                    </p>
                </div>

                <motion.div
                    className="pillars-grid"
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    {pillars.map((pillar) => (
                        <motion.div
                            key={pillar.id}
                            className="glass-panel"
                            variants={itemVariants}
                            style={{ padding: '40px', position: 'relative', overflow: 'hidden', cursor: 'default', background: '#ffffff' }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-50px',
                                    right: '-50px',
                                    width: '150px',
                                    height: '150px',
                                    background: pillar.glow,
                                    filter: 'blur(50px)',
                                    borderRadius: '50%'
                                }}
                            />
                            <div style={{ marginBottom: '24px' }}>{pillar.icon}</div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{pillar.title}</h3>
                            <p className="text-secondary">{pillar.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FocusAreas;
