export default function Hero() {
  const bgImage = "/images/hero-bg.svg";

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[70vh] flex items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/20 md:bg-black/40"></div>
      </div>

      <div className="relative z-20 text-center px-4 max-w-3xl">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Desatascos Profesionales en Bornos
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-200 drop-shadow-md">
          Tu vecino de confianza para urgencias 24h y limpieza de tuberías en
          toda la Sierra de Cádiz.
        </p>

        <button
          type="button"
          onClick={scrollToContact}
          className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition hover:scale-105 shadow-lg cursor-pointer"
        >
          Pedir Presupuesto Gratis
        </button>
      </div>
    </section>
  );
}
