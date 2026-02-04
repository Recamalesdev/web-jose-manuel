import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import WhatsAppBtn from "./components/WhatsAppBtn";
import Features from "./components/Features";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      offset: 100, // Empieza la animación 100px antes de llegar
      duration: 800, // Cuánto tarda (800ms = 0.8 segundos)
      easing: "ease-out-cubic", // Forma de moverse (suave)
      once: true, // Solo anima una vez por scroll
    });
  }, []);
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      <main>
        <div id="inicio">
          <Hero />
        </div>
        <Features />
        <div id="servicios">
          <Services />
        </div>
        <div id="contacto">
          <Contact />
        </div>
      </main>
      <Footer />

      <WhatsAppBtn />
    </div>
  );
}

export default App;
