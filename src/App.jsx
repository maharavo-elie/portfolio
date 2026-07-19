import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './page/Home';
import Projects from './page/Projects';
import Skills from './page/Skills';
import Contact from './page/Contact';
import './index.css';

export default function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
