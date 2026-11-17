import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation.jsx';
import About from '../components/About.jsx';
import Experience from '../components/Experience.jsx';
import Skills from '../components/Skills.jsx';
import Projects from '../components/Projects.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    document.title = 'E.A.L. Indusara Edirisinha | Associate Software Engineer';
  }, []);

  // Jump to the requested section when arriving from another route (e.g. "/#projects").
  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <>
      <Navigation />

      {/* Main Content */}
      <main>
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
