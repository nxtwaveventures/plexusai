import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, FlaskConical, Building2, GraduationCap, TrendingUp } from 'lucide-react';

const programs = [
  {
    num: '01',
    Icon: FlaskConical,
    badge: 'For Startups',
    badgeClass: 'badge-accent',
    accent: 'var(--accent)',
    title: 'Clinical Validation Access',
    headline: 'Test your AI inside a real hospital — not a lab.',
    desc: 'Structured access to live hospital workflows, real clinical data, and direct doctor feedback. Compress years of validation into months.',
    cta: 'Apply for Access',
  },
  {
    num: '02',
    Icon: Award,
    badge: '⭐ Flagship Program',
    badgeClass: 'badge-accent',
    accent: 'var(--accent)',
    title: 'Plexus AI Validation Certificate',
    headline: 'The credential that unlocks markets for your AI.',
    desc: "India's most trusted clinical AI certificate. Investors fund it faster. Regulators clear it smoother. Hospitals adopt what is certified.",
    cta: 'Apply for Certification',
    highlight: true,
  },
  {
    num: '03',
    Icon: Building2,
    badge: 'For Pharma & MedTech',
    badgeClass: 'badge-green',
    accent: '#059669',
    title: 'Sponsored Hospital Research',
    headline: 'Fund breakthrough studies with real patient impact.',
    desc: 'Commission structured AI clinical studies inside partner hospitals — publishable, real-world evidence with full ethical compliance.',
    cta: 'Explore Research Partnerships',
  },
  {
    num: '04',
    Icon: TrendingUp,
    badge: 'High-Potential Startups',
    badgeClass: 'badge-blue',
    accent: '#2563eb',
    title: 'AI Accelerator Track',
    headline: 'Skip the noise. Scale inside a hospital.',
    desc: 'Equity-based acceleration — co-building with clinicians, hospital administrators, and our expert advisory network.',
    cta: 'Apply to the Accelerator',
  },
  {
    num: '05',
    Icon: GraduationCap,
    badge: 'For Clinicians',
    badgeClass: 'badge-accent',
    accent: 'var(--accent)',
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
    <section id="programs" className="section section-light">
      <div className="container" ref={ref}>
        <div className="section-header centered">
          <span className="eyebrow">Programs Open for Application</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            What can you apply for?
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', maxWidth: '560px', margin: '0 auto' }}>
            Whether you're a startup seeking clinical proof, a pharma company funding hospital AI research, or a doctor leading digital transformation.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {programs.map((p, i) => {
            const { Icon } = p;
            return (
              <motion.div
                key={p.num}
                className="program-row"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                {/* Number */}
                <div style={{
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: p.highlight ? p.accent : '#d1d5db',
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {p.num}
                </div>

                {/* Content */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px',
                      background: `${p.accent === 'var(--accent)' ? 'rgba(13,148,136' : p.accent === '#059669' ? 'rgba(5,150,105' : 'rgba(37,99,235'},0.08)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={17} color={p.accent} />
                    </div>
                    <span className={`badge ${p.badgeClass}`}>{p.badge}</span>
                    {p.highlight && (
                      <span style={{
                        fontSize: '0.68rem', fontWeight: 700, color: '#fff',
                        background: 'var(--accent)', padding: '3px 10px',
                        borderRadius: '2px', letterSpacing: '0.06em', textTransform: 'uppercase',
                      }}>MOST IMPACTFUL</span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '4px', letterSpacing: '-0.01em' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontStyle: 'italic', color: p.accent, fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>
                    {p.headline}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.65, maxWidth: '600px' }}>
                    {p.desc}
                  </p>
                </div>

                {/* CTA */}
                <a
                  href="#sandbox"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    fontSize: '0.85rem', fontWeight: 600, color: p.accent,
                    whiteSpace: 'nowrap', transition: 'gap 200ms ease',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.gap = '9px'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.gap = '5px'}
                >
                  {p.cta} →
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Programs;
