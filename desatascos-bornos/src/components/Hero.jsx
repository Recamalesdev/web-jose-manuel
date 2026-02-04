import bgImage from "../assets/camion-manuel.jpg";

export default function Hero() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/20 to-black/10 z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80')",
        }}
      >
        {/* Aquí es donde pondré la foto de la furgoneta en el Castillo de los Ribera */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
      </div>

      <div className="relative z-20 text-center px-4 max-w-3xl">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Desatascos Profesionales en Bornos
        </h1>
        <p className="text-xl mb-8 drop-shadow-md">
          {/* En Hero.jsx */}
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Tu vecino de confianza para urgencias 24h y limpieza de tuberías en
            toda la Sierra de Cádiz.
          </p>
        </p>
        <a className="bg-white text-blue-700 font-bold py-4 px-10 rounded-lg text-lg shadow-xl hover:scale-105 transition">
          Pedir Presupuesto Gratis
        </a>
      </div>
    </section>
  );
}
