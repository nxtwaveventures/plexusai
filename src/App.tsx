import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import FocusAreas from './components/FocusAreas';
import Team from './components/Team';
import Advisors from './components/Advisors';
import Blog from './components/Blog';
import FAQ from './components/FAQ';
import Navbar from './components/Navbar';
import Sandbox from './components/Sandbox';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <CustomCursor />
      <Navbar />
      <Hero />
      <Gallery />
      <HowItWorks />
      <Features />
      <FocusAreas />
      <Team />
      <Advisors />
      <Blog />
      <FAQ />
      <Sandbox />
      <Footer />
    </div>
  );
}

export default App;
