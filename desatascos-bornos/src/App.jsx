import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import WhatsAppBtn from "./components/WhatsAppBtn";
import Features from "./components/Features";

function App() {
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
