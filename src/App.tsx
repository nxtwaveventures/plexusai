import { Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import HowItWorks from './components/HowItWorks';
import Programs from './components/Programs';
import Features from './components/Features';
import FocusAreas from './components/FocusAreas';
import Team from './components/Team';
import Advisors from './components/Advisors';
import FAQ from './components/FAQ';
import Navbar from './components/Navbar';
import Sandbox from './components/Sandbox';
import Footer from './components/Footer';
import BlogPost from './pages/BlogPost';
import BlogIndex from './pages/BlogIndex';

function Home() {
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <CustomCursor />
      <Navbar />
      <Hero />
      <Gallery />
      <HowItWorks />
      <Programs />
      <Features />
      <FocusAreas />
      <Team />
      <Advisors />
      <FAQ />
      <Sandbox />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/:id" element={<BlogPost />} />
    </Routes>
  );
}

export default App;
