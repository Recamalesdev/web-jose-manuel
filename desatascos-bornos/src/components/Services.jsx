// src/components/Services.jsx
import React from "react";

export default function Services() {
  const services = [
    {
      id: 1,
      title: "Desatascos Urgentes 24h",
      description:
        "Llegamos en menos de 1 hora. Solución rápida para fregaderos, bajantes y baños atascados.",

      image:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZ98ZEGid3Dczdx19J5bc8-Dp-W2ZNqocbd0E_aNojJu4strFBAmoumjQqR5KHatjXKsr81o8ryDjICo7wQyeVjOh0px8vTjaYzqHEbN0lEO9JIBrZMAtrJ7kbB2SmKFVr_BG1XHE586Ax/s640/servicio+urgencias+resulima+sevilla.jpg",
    },

    {
      id: 2,
      title: "Limpieza de Arquetas",
      description:
        "Eliminamos malos olores y prevenimos atascos limpiando los registros y sumideros de tu patio o comunidad.",
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/S0e8636b03bbd4bfe847ed1b04cbd77717.jpg",
    },
    {
      id: 3,
      title: "Limpieza de Pavimentos",
      description:
        "Limpieza a alta presión de suelos, garajes y patios. Eliminamos suciedad incrustada.",
      image: "https://www.excasas.com/images/galeria-de-imagenes/pavi.jpg",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
          Nuestros Servicios en la Sierra
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              {/* ZONA DE LA IMAGEN */}
              <div className="h-48 w-full">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* ZONA DEL TEXTO */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-blue-900">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
