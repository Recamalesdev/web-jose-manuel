import React from "react";
// Importamos iconos específicos de la librería
import { FaShieldAlt, FaClock, FaTools, FaHandSparkles } from "react-icons/fa";

export default function Features() {
  const features = [
    {
      id: 1,
      icon: <FaClock className="text-4xl text-blue-600" />,
      title: "Rapidez en Bornos",
      description:
        "Al ser locales, llegamos antes que nadie. Sin esperas innecesarias.",
    },
    {
      id: 2,
      icon: <FaHandSparkles className="text-4xl text-blue-600" />,
      title: "Limpieza Garantizada",
      description:
        "Protegemos tu suelo y muebles. Tu casa quedará igual que antes de llegar.",
    },
    {
      id: 3,
      icon: <FaTools className="text-4xl text-blue-600" />,
      title: "Agua a Alta Presión", // Cambio de título
      description:
        "Desatascamos usando mangueras de alta potencia. El método más eficaz y limpio para liberar tus tuberías.", // Texto honesto
    },
    {
      id: 4,
      icon: <FaShieldAlt className="text-4xl text-blue-600" />,
      title: "Precio Cerrado",
      description:
        "Te decimos cuánto costará antes de empezar. Sin sorpresas finales.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué confían en nosotros los vecinos de Bornos?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tratamos tu casa con el mismo cuidado que si fuera la nuestra.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={item.id}
              data-aos="fade-up" // <--- 1. Animación de aparición
              data-aos-delay={index * 100} // <--- 2. Retraso incremental
              className="text-center p-6 border border-gray-100 rounded-2xl hover:shadow-xl transition-shadow duration-300 bg-blue-50/50"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white rounded-full shadow-sm">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
