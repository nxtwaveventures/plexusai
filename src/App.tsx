import Hero from './components/Hero';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Sandbox from './components/Sandbox';

function App() {
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Features />
      <Gallery />
      <Pricing />
      <FAQ />
      <Sandbox />
      <Footer />
    </div>
  );
}

export default App;
