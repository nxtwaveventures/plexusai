import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import Logo from './Logo';

const navItems = [
  {
    label: 'Programs',
    href: '#programs',
    children: [
      { label: 'Clinical Validation', desc: 'Test AI in real hospital workflows', href: '#programs' },
      { label: 'AI Certification', desc: 'Get clinically certified credentials', href: '#programs' },
      { label: 'Hospital Research', desc: 'Sponsored clinical studies & RWE', href: '#programs' },
      { label: 'Accelerator', desc: 'Equity-based scaling program', href: '#programs' },
    ],
  },
  {
    label: 'Focus Areas',
    href: '#focus-areas',
    children: [
      { label: 'AI Clinical Workflow', desc: 'OPD, ICU & decision support AI', href: '#focus-areas' },
      { label: 'Digital Health Trials', desc: 'Wearables, diagnostics & monitoring', href: '#focus-areas' },
      { label: 'Evidence Generation', desc: 'RWE, regulatory & certification', href: '#focus-areas' },
    ],
  },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
];

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        background: '#ffffff',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'border-color 300ms ease',
      }}>
        {/* Scroll progress bar */}
      <motion.div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '2px', background: 'var(--accent)',
          transformOrigin: '0%', scaleX,
        }}
      />

      {/* Logo */}
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <Logo size={30} />
        </a>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          {navItems.map(item => (
            <div
              key={item.label}
              style={{ position: 'relative' }}
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <a
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text-body)',
                  transition: 'color 200ms',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-dark)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-body)'}
              >
                {item.label}
                {item.children && <ChevronDown size={13} style={{ marginTop: '1px' }} />}
              </a>

              <AnimatePresence>
                {item.children && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.14 }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 12px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      minWidth: '220px',
                      background: '#ffffff',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      padding: '6px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    }}
                  >
                    {item.children.map((child, i) => (
                      <a
                        key={i}
                        href={child.href}
                        style={{
                          display: 'block',
                          padding: '10px 12px',
                          borderRadius: '4px',
                          transition: 'background 150ms',
                        }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg-off-white)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                      >
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '2px' }}>
                          {child.label}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
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

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href="#sandbox"
            className="btn btn-primary"
            style={{ padding: '9px 22px', fontSize: '0.85rem' }}
          >
            Apply Now
          </a>
          <button
            onClick={() => setMobileOpen(v => !v)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-dark)',
            }}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              position: 'fixed',
              top: '64px',
              left: 0,
              right: 0,
              background: '#fff',
              borderBottom: '1px solid var(--border)',
              zIndex: 99,
              padding: '16px 24px 24px',
            }}
          >
            {navItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  padding: '12px 0',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--text-dark)',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {item.label}
              </a>
            ))}
            <a href="#sandbox" className="btn btn-primary" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
              Apply Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
