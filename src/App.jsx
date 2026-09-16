import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import MouseGlow from './components/MouseGlow';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/FloatingActions';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import FloatingActions from './components/FloatingActions';
import AIChatbot from './components/AIChatbot';

const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Education = lazy(() => import('./components/Education'));
const Contact = lazy(() => import('./components/Contact'));
const ProjectDetail = lazy(() => import('./components/ProjectDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
    </>
  );
}

function SectionFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-accent" />
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <BrowserRouter>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      <AnimatedBackground />
      <MouseGlow />
      <ScrollProgress />

      <Navbar />

      <main>
        <Suspense fallback={<SectionFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <BackToTop />
      <AIChatbot />
    </BrowserRouter>
  );
}
