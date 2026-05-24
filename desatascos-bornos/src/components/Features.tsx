import type { ReactNode } from "react";
import { FaShieldAlt, FaClock, FaTools, FaHandSparkles } from "react-icons/fa";
import { OWNER_NAME } from "../constants";

interface Feature {
  id: number;
  icon: ReactNode;
  title: string;
  description: string;
}

export default function Features() {
  const features: Feature[] = [
    {
      id: 1,
      icon: <FaClock className="text-4xl text-accent" />,
      title: "Disponibles 24h",
      description:
        "Servicio de urgencias las 24 horas. Respondemos rápido cuando más lo necesitas.",
    },
    {
      id: 2,
      icon: <FaHandSparkles className="text-4xl text-accent" />,
      title: "Limpieza Garantizada",
      description:
        "Protegemos tu suelo y muebles. Tu casa quedará igual que antes de llegar.",
    },
    {
      id: 3,
      icon: <FaTools className="text-4xl text-accent" />,
      title: "Agua a Alta Presión",
      description:
        "Desatascamos usando mangueras de alta potencia. El método más eficaz y limpio.",
    },
    {
      id: 4,
      icon: <FaShieldAlt className="text-4xl text-accent" />,
      title: "Presupuesto Sin Compromiso",
      description:
        "Te decimos cuánto costará antes de empezar. Sin sorpresas finales.",
    },
  ];

  return (
    <section className="py-20 bg-surface-card">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 [font-variant-ligatures:none]">
            ¿Por qué confiar en {OWNER_NAME}?
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Multiservicio profesional de fontanería y desatascos en Bornos y
            alrededores.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="text-center p-6 border border-border rounded-2xl hover:shadow-xl transition-shadow duration-300 bg-surface"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-surface-card rounded-full shadow-sm">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-text">{item.title}</h3>
              <p className="text-text-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
