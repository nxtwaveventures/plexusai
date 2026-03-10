import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, FlaskConical, Building2, GraduationCap, TrendingUp } from 'lucide-react';

const programs = [
    {
        icon: FlaskConical,
        color: 'rgba(255, 184, 0, 0.1)',
        iconColor: 'var(--accent-cyan)',
        badge: 'For Startups',
        title: 'Clinical Validation Access',
        headline: 'Test your AI inside a real hospital — not a lab.',
        desc: 'Get structured access to live hospital workflows, real clinical data, and direct doctor feedback. Compress years of validation into months with our embedded COE framework.',
        cta: 'Apply for Sandbox Access',
        tags: ['Live Hospital Deployment', 'Doctor Feedback Loops', 'Structured Validation'],
    },
    {
        icon: Award,
        color: 'rgba(14, 165, 233, 0.1)',
        iconColor: 'var(--accent-purple)',
        badge: '⭐ Flagship Program',
        title: 'Plexus AI Validation Certificate',
        headline: 'The credential that unlocks markets for your AI.',
        desc: 'Earn India\'s most trusted clinical AI certificate. Investors fund it faster. Regulators clear it smoother. Hospitals adopt what is certified. This is not just a badge — it is your market entry pass.',
        cta: 'Apply for Certification',
        tags: ['Investor-Trusted', 'Regulatory-Recognized', 'Hospital-Adopted'],
        highlight: true,
    },
    {
        icon: Building2,
        color: 'rgba(249, 115, 22, 0.1)',
        iconColor: 'var(--accent-blue)',
        badge: 'For Pharma & MedTech',
        title: 'Sponsored Hospital Research',
        headline: 'Fund breakthrough studies with real patient impact.',
        desc: 'Commission structured AI clinical studies inside our partner hospitals. From ICU monitoring to remote cardiac trials — get publishable, real-world evidence with full ethical compliance.',
        cta: 'Explore Research Partnerships',
        tags: ['Publishable Evidence', 'Ethically Compliant', 'Real Patient Data'],
    },
    {
        icon: TrendingUp,
        color: 'rgba(14, 165, 233, 0.1)',
        iconColor: 'var(--accent-purple)',
        badge: 'For High-Potential Startups',
        title: 'AI Accelerator Track',
        headline: 'Skip the noise. Scale inside a hospital.',
        desc: 'Our equity-based acceleration program gives the most promising startups a fast lane — co-building with clinicians, hospital administrators, and our expert advisory network.',
        cta: 'Apply to the Accelerator',
        tags: ['Equity-Based', 'Clinical Co-Development', 'Expert Advisory Network'],
    },
    {
        icon: GraduationCap,
        color: 'rgba(255, 184, 0, 0.1)',
        iconColor: 'var(--accent-cyan)',
        badge: 'For Clinicians',
        title: 'AI Certification for Doctors',
        headline: 'Become the AI-fluent doctor your hospital needs.',
        desc: 'Structured, hospital-grounded AI certification programs designed by clinicians for clinicians. Understand, evaluate and champion AI tools with confidence — and lead digital transformation from the ward.',
        cta: 'Register for Certification',
        tags: ['Hospital-Grounded Training', 'Clinical AI Literacy', 'Career Differentiator'],
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const Programs = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="programs" className="section" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
            <div className="bg-mesh" style={{ opacity: 0.4 }}></div>
            <div className="container" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', marginBottom: '64px' }}
                >
                    <div className="badge" style={{ marginBottom: '20px' }}>Programs Open for Application</div>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '20px' }}>
                        What Can You <span className="text-gradient-accent">Apply For?</span>
                    </h2>
                    <p className="text-secondary" style={{ fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto' }}>
                        Whether you are a startup seeking clinical proof, a pharma company funding hospital AI research, or a doctor ready to lead digital transformation — there is a program built for you.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
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
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: p.highlight ? '2px solid var(--accent-purple)' : undefined,
                                    boxShadow: p.highlight ? '0 0 50px rgba(14,165,233,0.12), 0 20px 40px rgba(0,0,0,0.06)' : undefined,
                                }}
                            >
                                {p.highlight && (
                                    <div style={{
                                        position: 'absolute', top: '16px', right: '16px',
                                        background: 'var(--accent-purple)', color: '#fff',
                                        borderRadius: '999px', fontSize: '0.65rem', fontWeight: 700,
                                        padding: '4px 12px', textTransform: 'uppercase', letterSpacing: '0.05em'
                                    }}>
                                        Most Impactful
                                    </div>
                                )}

                                {/* Icon + Badge row */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                    <div style={{ background: p.color, padding: '12px', borderRadius: '14px', display: 'inline-flex', flexShrink: 0 }}>
                                        <Icon color={p.iconColor} size={24} />
                                    </div>
                                    <span style={{
                                        fontSize: '0.75rem', fontWeight: 700, color: p.iconColor,
                                        textTransform: 'uppercase', letterSpacing: '0.06em',
                                        background: p.color, padding: '4px 12px', borderRadius: '999px'
                                    }}>{p.badge}</span>
                                </div>

                                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', fontWeight: 700 }}>{p.title}</h3>
                                <p style={{ fontSize: '1rem', fontWeight: 600, color: p.iconColor, marginBottom: '12px', fontStyle: 'italic', fontFamily: 'Outfit' }}>{p.headline}</p>
                                <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '20px', flexGrow: 1 }}>{p.desc}</p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                                    {p.tags.map(tag => (
                                        <span key={tag} style={{
                                            background: p.color, color: p.iconColor,
                                            fontSize: '0.72rem', fontWeight: 600,
                                            padding: '4px 12px', borderRadius: '999px',
                                            border: `1px solid ${p.iconColor}22`,
                                        }}>{tag}</span>
                                    ))}
                                </div>

                                <a
                                    href="#sandbox"
                                    className="btn"
                                    style={{
                                        background: p.highlight ? 'var(--accent-purple)' : p.color,
                                        color: p.highlight ? '#fff' : p.iconColor,
                                        border: `1.5px solid ${p.iconColor}44`,
                                        padding: '10px 20px',
                                        fontSize: '0.875rem',
                                        borderRadius: '12px',
                                        textAlign: 'center',
                                        display: 'block',
                                        fontWeight: 600,
                                    }}
                                >{p.cta} →</a>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Programs;
