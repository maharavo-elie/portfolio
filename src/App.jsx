import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './page/Home';
import About from './page/About';
import Projects from './page/Projects';
import Skills from './page/Skills';
import Contact from './page/Contact';
import Curseur from './components/Curseur';
import './index.css';

export default function App() {
  return (
    <>
      <Curseur />
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
