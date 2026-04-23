import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

// Replace these with real advisor data when photos/profiles are ready
const advisors: {
  name: string;
  category: string;
  role: string;
  bio: string;
  photo: string | null;
  linkedin?: string;
}[] = [
  {
    name: 'Sachin Gaur',
    category: 'Strategy & Innovation Advisory',
    role: 'Serial Entrepreneur · Stanford GSB · AI & Deep-Tech Innovator',
    bio: 'Global innovation leader with experience in AI, deep-tech ecosystems, and international collaborations, guiding strategy and scaling.',
    photo: '/advisors/advisor-1.jpg',
    linkedin: 'https://no.linkedin.com/in/sachgaur',
  },
  {
    name: 'Dr. [Name]',
    category: '[Advisory Category]',
    role: '[Role · Institution]',
    bio: 'Bio coming soon.',
    photo: '/advisors/advisor-2.jpg',
    linkedin: '#',
  },
  {
    name: 'Dr. [Name]',
    category: '[Advisory Category]',
    role: '[Role · Institution]',
    bio: 'Bio coming soon.',
    photo: '/advisors/advisor-3.jpg',
    linkedin: '#',
  },
  {
    name: 'Dr. [Name]',
    category: '[Advisory Category]',
    role: '[Role · Institution]',
    bio: 'Bio coming soon.',
    photo: '/advisors/advisor-4.jpg',
    linkedin: '#',
  },
  {
    name: '[Name]',
    category: '[Advisory Category]',
    role: '[Role · Institution]',
    bio: 'Bio coming soon.',
    photo: '/advisors/advisor-5.jpg',
    linkedin: '#',
  },
];

const Advisors = () => {
  return (
    <section id="advisors" className="section section-subtle">
      <div className="container">
        <div className="section-header centered">
          <span className="eyebrow">Expert Network</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Our Advisors
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', maxWidth: '480px', margin: '0 auto' }}>
            World-class clinicians, technologists, and industry leaders guiding PlexusAI's mission.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '24px',
        }}>
          {advisors.map((advisor, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28, scale: 0.96, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="card-light"
              style={{ overflow: 'hidden' }}
            >
              {/* Photo */}
              <div style={{
                width: '100%',
                padding: '32px 0 24px',
                background: 'var(--bg-off-white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {advisor.photo ? (
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '3px solid var(--bg-white)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                    flexShrink: 0,
                  }}>
                    <img
                      src={advisor.photo}
                      alt={advisor.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                ) : (
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: '#e2e2e2',
                    border: '3px solid var(--bg-white)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: '2rem', color: '#aaa' }}>
                      {advisor.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: '20px 24px 24px' }}>
                <div style={{
                  fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '10px',
                }}>
                  {advisor.category}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                    {advisor.name}
                  </h3>
                  {advisor.linkedin && (
                    <a
                      href={advisor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--text-muted)', transition: 'color 200ms', flexShrink: 0, marginLeft: '8px' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#0a66c2'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                    >
                      <Linkedin size={15} />
                    </a>
                  )}
                </div>
                <div style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.5 }}>
                  {advisor.role}
                </div>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                  {advisor.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advisors;
