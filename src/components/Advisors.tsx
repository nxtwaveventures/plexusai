import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

const advisors: {
  name: string;
  category: string;
  role: string;
  bio: string;
  photo: string | null;
  linkedin?: string;
}[] = [
  {
    name: 'Dr. Viveka Kumar',
    category: 'Clinical Advisory Board',
    role: 'Chairman of Cardiology · Max Super Speciality Hospital, New Delhi',
    bio: 'Senior interventional cardiologist with expertise in complex cardiac care, guiding real-world clinical validation and integration.',
    photo: '/advisors/advisor-viveka.jpg',
  },
  {
    name: 'Dr. Kris Vijay',
    category: 'Clinical Advisory Board',
    role: 'President, Innovative Cardiometabolic Center, USA · Clinical Professor, University of Arizona',
    bio: 'Globally recognized cardiometabolic expert with 40+ years of experience in clinical practice, research, and healthcare innovation.',
    photo: '/advisors/advisor-kris.png',
  },
  {
    name: 'Dr. Ravi Gaur',
    category: 'Clinical Advisory Board',
    role: 'Chair, Medical Advisory Committee, Oncquest Laboratories · Founder, DRG Path Labs',
    bio: 'Healthcare leader with 30+ years of experience in pathology and diagnostics, specializing in scalable healthcare systems.',
    photo: null,
  },
  {
    name: 'Dr. Venkat Saddikuti',
    category: 'Academic & Research Advisory',
    role: 'Professor, Operations & Supply Chain Management · IIM Lucknow · Fulbright Scholar',
    bio: 'Academic leader in healthcare systems and operations, enabling research-driven scalability and innovation.',
    photo: '/advisors/advisor-venkat.png',
  },
  {
    name: 'Sachin Gaur',
    category: 'Strategy & Innovation Advisory',
    role: 'Serial Entrepreneur · Stanford GSB · AI & Deep-Tech Innovator',
    bio: 'Global innovation leader with experience in AI, deep-tech ecosystems, and international collaborations, guiding strategy and scaling.',
    photo: '/advisors/advisor-1.jpg',
    linkedin: 'https://no.linkedin.com/in/sachgaur',
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
