import Hero from './components/Hero';
import Gallery from './components/Gallery';
import FAQ from './components/FAQ';
import Navbar from './components/Navbar';
import Sandbox from './components/Sandbox';

function App() {
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Gallery />
      <FAQ />
      <Sandbox />
    </div>
  );
}

export default App;
