import { SERVICES, toWebpAsset } from "../constants";

export default function Services() {
  return (
    <section className="py-16 bg-surface">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          Nuestros Servicios
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-surface-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              <div className="h-48 overflow-hidden rounded-t-lg bg-surface">
                <picture>
                  <source srcSet={toWebpAsset(service.image)} type="image/webp" />
                  <img
                    src={service.image}
                    alt={service.title}
                    width={800}
                    height={480}
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                </picture>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-primary">
                  {service.title}
                </h3>
                <p className="text-text-muted">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
