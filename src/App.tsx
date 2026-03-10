
import Hero from './components/Hero';
import FocusAreas from './components/FocusAreas';
import Programs from './components/Programs';
import Sandbox from './components/Sandbox';
import { useState, useEffect } from 'react';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* ── Navigation ── */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        padding: '0 40px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.3s, border-color 0.3s',
        background: scrolled ? 'rgba(6, 7, 26, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      }}>
        {/* Logo */}
        <a href="/" style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.3rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          PLEXUS<span style={{ color: 'var(--accent-indigo)' }}>AI</span>
          <span style={{ marginLeft: '8px', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', verticalAlign: 'middle' }}>COE</span>
        </a>

        {/* Links */}
        <div className="nav-links" style={{ display: 'flex', gap: '40px', fontSize: '0.875rem', fontWeight: 500 }}>
          {[['#focus-areas', 'Focus Areas'], ['#programs', 'Programs'], ['#sandbox', 'Apply']].map(([href, label]) => (
            <a key={href} href={href} style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="#sandbox" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.875rem' }}>
          Apply Now
        </a>
      </nav>

      {/* ── Sections ── */}
      <Hero />
      <Programs />
      <FocusAreas />
      <Sandbox />
    </div>
  );
}

export default App;
