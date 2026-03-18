import { Twitter, Linkedin, Github, MessageCircle } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Programs', href: '#programs' },
    { label: 'Focus Areas', href: '#focus-areas' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Certification', href: '#programs' },
  ],
  Resources: [
    { label: 'Documentation', href: '#faq' },
    { label: 'Blog', href: '#faq' },
    { label: 'Community', href: '#faq' },
    { label: 'Contact', href: '#sandbox' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Partners', href: '#' },
    { label: 'Press', href: '#' },
  ],
  Legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Security', href: '#' },
  ],
};

const Footer = () => {
  return (
    <footer style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', borderTop: 'none' }}>
      <div className="container" style={{ padding: '80px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '40px', marginBottom: '60px' }}>
          <div>
            <a href="/" style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: 'var(--bg-primary)', display: 'block', marginBottom: '16px' }}>
              PLEXUS<span style={{ color: 'var(--accent-primary)' }}>AI</span>
            </a>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, maxWidth: '240px' }}>
              India's first hospital-embedded AI innovation hub. Validate your AI inside real hospitals.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
              <a href="#" style={{ color: 'rgba(255, 255, 255, 0.5)', transition: 'color 0.2s' }}><Twitter size={20} /></a>
              <a href="#" style={{ color: 'rgba(255, 255, 255, 0.5)', transition: 'color 0.2s' }}><Linkedin size={20} /></a>
              <a href="#" style={{ color: 'rgba(255, 255, 255, 0.5)', transition: 'color 0.2s' }}><Github size={20} /></a>
              <a href="#" style={{ color: 'rgba(255, 255, 255, 0.5)', transition: 'color 0.2s' }}><MessageCircle size={20} /></a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                {category}
              </div>
              <ul style={{ listStyle: 'none' }}>
                {links.map((link) => (
                  <li key={link.label} style={{ marginBottom: '12px' }}>
                    <a href={link.href} style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)', transition: 'color 0.2s' }}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)' }}>
            © 2026 PlexusAI. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)' }}>Privacy</a>
            <a href="#" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)' }}>Terms</a>
            <a href="#" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)' }}>Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
