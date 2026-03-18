
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, FlaskConical, Building2, GraduationCap, TrendingUp } from 'lucide-react';

const programs = [
  {
    num: '01',
    Icon: FlaskConical,
    badge: 'For Startups',
    badgeClass: 'badge-indigo',
    accentColor: 'var(--accent-indigo)',
    title: 'Clinical Validation Access',
    headline: 'Test your AI inside a real hospital — not a lab.',
    desc: 'Structured access to live hospital workflows, real clinical data, and direct doctor feedback. Compress years of validation into months.',
    cta: 'Apply for Access',
  },
  {
    num: '02',
    Icon: Award,
    badge: '⭐ Flagship',
    badgeClass: 'badge-gold',
    accentColor: 'var(--accent-gold)',
    title: 'Plexus AI Validation Certificate',
    headline: 'The credential that unlocks markets for your AI.',
    desc: 'India\'s most trusted clinical AI certificate. Investors fund it faster. Regulators clear it smoother. Hospitals adopt what is certified.',
    cta: 'Apply for Certification',
    highlight: true,
  },
  {
    num: '03',
    Icon: Building2,
    badge: 'For Pharma & MedTech',
    badgeClass: 'badge-teal',
    accentColor: 'var(--accent-teal)',
    title: 'Sponsored Hospital Research',
    headline: 'Fund breakthrough studies with real patient impact.',
    desc: 'Commission structured AI clinical studies inside partner hospitals — publishable, real-world evidence with full ethical compliance.',
    cta: 'Explore Research Partnerships',
  },
  {
    num: '04',
    Icon: TrendingUp,
    badge: 'High-Potential Startups',
    badgeClass: 'badge-rose',
    accentColor: 'var(--accent-rose)',
    title: 'AI Accelerator Track',
    headline: 'Skip the noise. Scale inside a hospital.',
    desc: 'Equity-based acceleration — co-building with clinicians, hospital administrators, and our expert advisory network.',
    cta: 'Apply to the Accelerator',
  },
  {
    num: '05',
    Icon: GraduationCap,
    badge: 'For Clinicians',
    badgeClass: 'badge-indigo',
    accentColor: '#a78bfa',
    title: 'AI Certification for Doctors',
    headline: 'Become the AI-fluent clinician your hospital needs.',
    desc: 'Hospital-grounded AI certification designed by clinicians for clinicians. Evaluate and champion AI tools with full confidence.',
    cta: 'Register for Certification',
  },
];

const Programs = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="programs" className="section" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container" ref={ref} style={{ position: 'relative', zIndex: 1, paddingTop: '40px' }}>
        {/* Section header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow" style={{ color: 'var(--text-secondary)' }}>Programs Open for Application</span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '20px', letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.1 }}>
            What Can You{' '}
            <span style={{ color: 'var(--accent-primary)' }}>Apply For?</span>
          </h2>
          <p className="text-secondary" style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            Whether you're a startup seeking clinical proof, a pharma company funding hospital AI research, or a doctor leading digital transformation — there's a program built for you.
          </p>
        </motion.div>

        {/* Programs list (editorial numbered layout) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {programs.map((p, i) => {
            const { Icon } = p;
            return (
              <motion.div
                key={p.num}
                className="program-row"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Number */}
                <div style={{
                  fontFamily: 'Montserrat', fontWeight: 900, fontSize: '3rem',
                  color: p.highlight ? p.accentColor : 'var(--border-medium)',
                  lineHeight: 1,
                  opacity: 1,
                }}>
                  {p.num}
                </div>

                {/* Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <div style={{
                      background: `${p.accentColor}18`, borderRadius: '10px',
                      padding: '8px', display: 'inline-flex',
                    }}>
                      <Icon size={20} color={p.accentColor} />
                    </div>
                    <span className={`badge ${p.badgeClass}`} style={{ fontSize: '0.7rem' }}>{p.badge}</span>
                    {p.highlight && (
                      <span style={{
                        fontFamily: 'Montserrat', fontSize: '0.68rem', fontWeight: 800,
                        color: '#ffffff', background: 'var(--accent-secondary)',
                        padding: '3px 10px', borderRadius: '0px', letterSpacing: '0.05em', textTransform: 'uppercase',
                      }}>MOST IMPACTFUL</span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{p.title}</h3>
                  <p style={{ fontStyle: 'italic', color: p.accentColor, fontSize: '0.9rem', fontFamily: 'Montserrat', fontWeight: 600 }}>{p.headline}</p>
                  <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '640px' }}>{p.desc}</p>
                </div>

                {/* CTA */}
                <div>
                  <a href="#sandbox" className="btn btn-ghost" style={{ whiteSpace: 'nowrap', fontSize: '0.85rem', padding: '10px 20px' }}>
                    {p.cta} →
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Programs;
