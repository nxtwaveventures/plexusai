import { Twitter, Linkedin, Github, MessageCircle } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Programs', href: '#programs' },
    { label: 'Focus Areas', href: '#focus-areas' },
    { label: 'Certification', href: '#programs' },
    { label: 'Accelerator', href: '#programs' },
  ],
  Resources: [
    { label: 'Documentation', href: '#faq' },
    { label: 'Blog', href: '#faq' },
    { label: 'Community', href: '#faq' },
    { label: 'Contact', href: '#sandbox' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Advisors', href: '#advisors' },
    { label: 'Partners', href: '#' },
    { label: 'Careers', href: '#' },
  ],
  Legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Security', href: '#' },
  ],
};

const socialLinks = [
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/plexus-ai-b78830350/', label: 'LinkedIn' },
  { Icon: Github, href: '#', label: 'GitHub' },
  { Icon: MessageCircle, href: '#', label: 'Community' },
];

const Footer = () => {
  return (
    <footer style={{ background: '#1E0A3C', color: '#ffffff', borderTop: 'none' }}>
      <div className="container" style={{ padding: '72px 32px 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '240px repeat(4, 1fr)',
          gap: '40px',
          marginBottom: '56px',
        }}>
          {/* Brand column */}
          <div>
            <a href="/" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.01em', color: '#ffffff', display: 'block', marginBottom: '14px' }}>
              Plexus<span style={{ color: 'var(--accent)' }}>AI</span>
            </a>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, maxWidth: '200px', marginBottom: '24px' }}>
              India's first hospital-embedded AI innovation hub.
            </p>
            <div style={{ display: 'flex', gap: '14px' }}>
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,0.35)', transition: 'color 200ms' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#ffffff'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <div style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '16px',
              }}>
                {category}
              </div>
              <ul style={{ listStyle: 'none' }}>
                {links.map(link => (
                  <li key={link.label} style={{ marginBottom: '10px' }}>
                    <a
                      href={link.href}
                      style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', transition: 'color 200ms' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#ffffff'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} PlexusAI Innovation Hub. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy', 'Terms', 'Security'].map(label => (
              <a key={label} href="#" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', transition: 'color 200ms' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
