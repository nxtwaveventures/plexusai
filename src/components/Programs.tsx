import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, FlaskConical, Building2, GraduationCap, TrendingUp } from 'lucide-react';

const programs = [
    {
        icon: FlaskConical,
        color: 'rgba(255, 184, 0, 0.12)',
        iconColor: 'var(--accent-cyan)',
        title: 'MedTech Sandbox',
        subtitle: 'Clinical Validation Program',
        desc: 'Validate your AI product inside a real hospital. Gain clinical testing access, live hospital deployment, and structured doctor feedback.',
        tags: ['₹50K–1L Application', '₹2–5L/month Access', 'Real Patient Workflows'],
    },
    {
        icon: Award,
        color: 'rgba(14, 165, 233, 0.12)',
        iconColor: 'var(--accent-purple)',
        title: 'Plexus AI Certificate',
        subtitle: '⭐ Flagship Product',
        desc: 'The gold standard for clinical AI in India. Investors trust it. Regulators respect it. Hospitals adopt certified products faster.',
        tags: ['₹15–30L Certification Fee', 'Clinical Study Report', 'Regulatory Support'],
        highlight: true,
    },
    {
        icon: Building2,
        color: 'rgba(249, 115, 22, 0.12)',
        iconColor: 'var(--accent-blue)',
        title: 'Sponsored Research',
        subtitle: 'Industry Partnerships',
        desc: 'Pharma and MedTech companies fund hospital-based research studies. ICU AI, remote cardiac monitoring, wearable trials and more.',
        tags: ['₹50L–3Cr per Study', 'Device & AI Companies', 'Pharma Partners'],
    },
    {
        icon: TrendingUp,
        color: 'rgba(14, 165, 233, 0.12)',
        iconColor: 'var(--accent-purple)',
        title: 'AI Accelerator',
        subtitle: 'Equity Model',
        desc: 'Top-performing startups get an accelerated path with equity-based participation. Build a ₹100–500 crore portfolio over 5–7 years.',
        tags: ['5–7% Equity', '10 Startups / Year', '₹100–500Cr Portfolio'],
    },
    {
        icon: GraduationCap,
        color: 'rgba(255, 184, 0, 0.12)',
        iconColor: 'var(--accent-cyan)',
        title: 'AI for Doctors',
        subtitle: 'Training & Certification',
        desc: 'Upskill clinical teams on AI tools using structured hospital-based programs. Revenue model with 200+ doctors annually.',
        tags: ['₹50K–1L per Doctor', '200 Doctors / Year', '₹1–2Cr Annual Revenue'],
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const Programs = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="programs" className="section" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
            <div className="bg-mesh" style={{ opacity: 0.5 }}></div>
            <div className="container" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', marginBottom: '64px' }}
                >
                    <div className="badge" style={{ marginBottom: '20px' }}>Revenue Programs</div>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '20px' }}>
                        Programs That <span className="text-gradient-accent">Drive Revenue</span>
                    </h2>
                    <p className="text-secondary" style={{ fontSize: '1.1rem', maxWidth: '620px', margin: '0 auto' }}>
                        A multi-stream model combining validation fees, sponsored research, certification, and an equity accelerator. Potential: <strong style={{ color: 'var(--text-primary)' }}>₹8–15 crore annually</strong> within 2–3 years.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '24px',
                    }}
                >
                    {programs.map((p) => {
                        const Icon = p.icon;
                        return (
                            <motion.div
                                key={p.title}
                                variants={itemVariants}
                                className="glass-advanced"
                                style={{
                                    padding: '32px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    border: p.highlight ? '2px solid var(--accent-purple)' : '1px solid rgba(255,255,255,0.5)',
                                    boxShadow: p.highlight
                                        ? '0 0 40px rgba(14,165,233,0.15), 0 20px 40px rgba(0,0,0,0.06)'
                                        : undefined,
                                }}
                            >
                                {p.highlight && (
                                    <div style={{
                                        position: 'absolute', top: '16px', right: '16px',
                                        background: 'var(--accent-purple)', color: '#fff',
                                        borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700,
                                        padding: '4px 12px', textTransform: 'uppercase', letterSpacing: '0.05em'
                                    }}>
                                        Most Valuable
                                    </div>
                                )}
                                <div style={{ background: p.color, padding: '14px', borderRadius: '16px', display: 'inline-flex', marginBottom: '20px' }}>
                                    <Icon color={p.iconColor} size={28} />
                                </div>
                                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: p.iconColor, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{p.subtitle}</p>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', fontWeight: 700 }}>{p.title}</h3>
                                <p className="text-secondary" style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '20px' }}>{p.desc}</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {p.tags.map(tag => (
                                        <span key={tag} style={{
                                            background: p.color,
                                            color: p.iconColor,
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            padding: '4px 12px',
                                            borderRadius: '999px',
                                            border: `1px solid ${p.iconColor}22`,
                                        }}>{tag}</span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Programs;
