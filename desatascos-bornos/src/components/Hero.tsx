import { BRAND_NAME, HERO_IMAGE, OWNER_NAME, TAGLINE } from "../constants";

export default function Hero() {
  const bgImage = HERO_IMAGE;

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[70vh] flex items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-primary/75 md:bg-primary/80"></div>
      </div>

      <div className="relative z-20 text-center px-4 max-w-3xl">
        <p className="text-accent font-semibold text-lg mb-3 tracking-wide">
          {OWNER_NAME}
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          {BRAND_NAME}
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-200 drop-shadow-md">
          {TAGLINE}
        </p>

        <button
          type="button"
          onClick={scrollToContact}
          className="bg-accent text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-accent-dark transition hover:scale-105 shadow-lg cursor-pointer"
        >
          Pedir Presupuesto Sin Compromiso
        </button>
      </div>
    </section>
  );
}
