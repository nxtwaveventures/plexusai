import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

const team = [
  {
    name: 'Dr. Amit Raj',
    role: 'Founder, Plexus AI · Cardiologist & Healthcare Strategist',
    bullets: [
      'Building Plexus AI for real-world validation and deployment of AI in healthcare.',
      'Integrating MedTech and AI directly into clinical workflows for scalable impact.',
      'Delivering proven improvements in access and efficiency across rural and digital care settings.',
      'Driving a patient-centric, technology-enabled healthcare ecosystem.',
    ],
    photo: '/team/founder-1.jpg',
    linkedin: 'https://www.linkedin.com/in/doctoramitraj/',
  },
];

const Team = () => {
  return (
    <section id="team" className="section section-light">
      <div className="container">
        <div className="section-header centered">
          <span className="eyebrow">Leadership</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Meet the Founder
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', maxWidth: '460px', margin: '0 auto' }}>
            The vision behind India's first hospital-embedded AI innovation hub.
          </p>
        </div>

        {team.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '260px 1fr',
              gap: '64px',
              alignItems: 'start',
              maxWidth: '860px',
              margin: '0 auto',
            }}
          >
            {/* Left: photo + name */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid var(--border)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                margin: '0 auto 20px',
              }}>
                <img
                  src={member.photo}
                  alt={member.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
                {member.name}
              </h3>

              <div style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--accent)',
                lineHeight: 1.5,
                marginBottom: '16px',
              }}>
                {member.role}
              </div>

              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#0a66c2',
                  transition: 'opacity 200ms',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.7'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
              >
                <Linkedin size={15} /> LinkedIn
              </a>
            </div>

            {/* Right: bullets */}
            <div style={{ paddingTop: '8px' }}>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {member.bullets.map((point, j) => (
                  <li
                    key={j}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      fontSize: '1rem',
                      color: 'var(--text-body)',
                      lineHeight: 1.65,
                    }}
                  >
                    <span style={{
                      color: 'var(--accent)',
                      fontWeight: 700,
                      fontSize: '1rem',
                      marginTop: '2px',
                      flexShrink: 0,
                    }}>
                      →
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Team;
