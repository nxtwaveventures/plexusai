import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const navItems = [
  {
    label: 'Programs',
    href: '#programs',
    children: [
      { label: 'Clinical Validation', desc: 'Test AI in real hospital workflows', href: '#programs' },
      { label: 'AI Certification', desc: 'Get clinically certified credentials', href: '#programs' },
      { label: 'Hospital Research', desc: 'Sponsored clinical studies', href: '#programs' },
      { label: 'Accelerator', desc: 'Equity-based scaling program', href: '#programs' },
    ]
  },
  {
    label: 'Focus Areas',
    href: '#focus-areas',
    children: [
      { label: 'Diagnostics', desc: 'Medical imaging & detection AI', href: '#focus-areas' },
      { label: 'Patient Care', desc: 'Monitoring & engagement', href: '#focus-areas' },
      { label: 'Operations', desc: 'Hospital workflow automation', href: '#focus-areas' },
      { label: 'Research', desc: 'Clinical trial optimization', href: '#focus-areas' },
    ]
  },
  {
    label: 'Resources',
    href: '#faq',
    children: [
      { label: 'Documentation', desc: 'API guides & tutorials', href: '#faq' },
      { label: 'Blog', desc: 'Insights & case studies', href: '#faq' },
      { label: 'Community', desc: 'Connect with other builders', href: '#faq' },
    ]
  },
];

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '0 24px',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'rgba(5, 5, 7, 0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      <a href="/" style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
        PLEXUS<span style={{ color: '#a5b4fc' }}>AI</span>
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        {navItems.map((item) => (
          <div
            key={item.label}
            style={{ position: 'relative' }}
            onMouseEnter={() => setOpenDropdown(item.label)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <a
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                transition: 'color 0.2s',
                cursor: 'pointer',
              }}
            >
              {item.label}
              <ChevronDown size={14} />
            </a>

            <AnimatePresence>
              {openDropdown === item.label && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginTop: '12px',
                    minWidth: '240px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '8px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  {item.children?.map((child, i) => (
                    <a
                      key={i}
                      href={child.href}
                      style={{
                        display: 'block',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-sm)',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.05)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                    >
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>
                        {child.label}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {child.desc}
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <a href="#sandbox" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.875rem' }}>
        Apply Now
      </a>
    </nav>
  );
};

export default Navbar;
