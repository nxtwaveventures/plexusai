
import Hero from './components/Hero';
import FocusAreas from './components/FocusAreas';
import Sandbox from './components/Sandbox';
import './App.css'; // Emptied Vite styles

function App() {
  return (
    <div className="app-container">
      {/* Navigation Layer */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-glass)'
      }}>
        <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-primary)', letterSpacing: '1px' }}>
          PLEXUS<span style={{ color: 'var(--accent-cyan)' }}>AI</span> COE
        </div>
        <div style={{ gap: '32px', fontSize: '0.9rem', fontWeight: 600, display: 'flex' }}>
          <a href="#focus-areas" className="text-secondary" style={{ transition: 'color 0.2s', textDecoration: 'none' }}>Focus Areas</a>
          <a href="#sandbox" className="text-secondary" style={{ transition: 'color 0.2s', textDecoration: 'none' }}>Sandbox</a>
        </div>
        <a href="#sandbox" className="btn btn-primary" style={{ padding: '8px 24px', fontSize: '0.9rem' }}>
          Join the Hub
        </a>
      </nav>

      {/* Main Sections */}
      <Hero />
      <FocusAreas />
      <Sandbox />
    </div>
  );
}

export default App;
