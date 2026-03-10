
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
      {/* subtle background glow */}
      <div style={{
        position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '400px', pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.06) 0%, transparent 70%)',
      }} />

      <div className="container" ref={ref} style={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">Programs Open for Application</span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', marginBottom: '20px' }}>
            What Can You{' '}
            <span className="text-gradient-indigo">Apply For?</span>
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
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto',
                  gap: '32px',
                  alignItems: 'center',
                  padding: '32px 0',
                  borderBottom: '1px solid var(--border-subtle)',
                  cursor: 'default',
                  transition: 'background 0.2s',
                  borderRadius: '4px',
                  position: 'relative',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.03)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {/* Number */}
                <div style={{
                  fontFamily: 'Outfit', fontWeight: 900, fontSize: '2.5rem',
                  color: p.highlight ? p.accentColor : 'var(--text-muted)',
                  lineHeight: 1,
                  opacity: p.highlight ? 1 : 0.5,
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
                        fontFamily: 'Outfit', fontSize: '0.68rem', fontWeight: 800,
                        color: '#0d0700', background: 'var(--accent-gold)',
                        padding: '3px 10px', borderRadius: '999px', letterSpacing: '0.05em', textTransform: 'uppercase',
                      }}>MOST IMPACTFUL</span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{p.title}</h3>
                  <p style={{ fontStyle: 'italic', color: p.accentColor, fontSize: '0.9rem', fontFamily: 'Outfit', fontWeight: 600 }}>{p.headline}</p>
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
