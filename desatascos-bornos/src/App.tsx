import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import CoverageArea from "./components/CoverageArea";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import WhatsAppBtn from "./components/WhatsAppBtn";
import Features from "./components/Features";
import AppErrorBoundary from "./components/AppErrorBoundary";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  return (
    <AppErrorBoundary>
      <div className="min-h-screen bg-surface font-sans text-text">
        <Navbar />
        <main>
          <div id="inicio">
            <Hero />
          </div>
          <Features />
          <div id="servicios">
            <Services />
          </div>
          <CoverageArea />
          <div id="contacto">
            <Contact />
          </div>
        </main>
        <Footer />
        <WhatsAppBtn />
      </div>
    </AppErrorBoundary>
  );
}

export default App;
