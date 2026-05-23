import { useState, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";
import {
  FaCheckCircle,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import {
  CONTACT_SERVICE_OPTIONS,
  EMAIL,
  LOCATION,
  OWNER_NAME,
  PHONE_DISPLAY,
  PHONE_TEL,
  type ServiceType,
} from "../constants";

interface FormData {
  nombre: string;
  telefono: string;
  servicio: ServiceType;
  mensaje: string;
}

const initialFormData: FormData = {
  nombre: "",
  telefono: "",
  servicio: "general",
  mensaje: "",
};

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    const templateParams = {
      nombre: formData.nombre,
      telefono: formData.telefono,
      servicio: formData.servicio,
      mensaje: formData.mensaje,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
        });

        setFormData(initialFormData);
        setIsSubmitted(true);
        setIsSending(false);
      })
      .catch(() => {
        alert(`Hubo un error. Llama al ${PHONE_DISPLAY}.`);
        setIsSending(false);
      });
  };

  return (
    <section id="contact" className="py-20 bg-surface">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            ¿Tienes alguna duda?
          </h2>
          <p className="text-text-muted">
            Déjanos tus datos y te llamamos nosotros. Presupuesto sin
            compromiso.
          </p>
        </div>

        <div className="bg-surface-card rounded-2xl shadow-xl overflow-hidden md:flex">
          <div className="bg-primary p-8 md:w-1/3 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-4">Información Directa</h3>
              <p className="mb-4 text-gray-300 text-sm">
                Urgencias 24h disponibles.
              </p>
              <div className="space-y-4">
                <a
                  href={`tel:${PHONE_TEL}`}
                  aria-label={`Llamar al ${PHONE_DISPLAY}`}
                  className="flex items-center gap-3 hover:text-accent transition-colors duration-300 group"
                >
                  <FaPhoneAlt
                    className="text-xl shrink-0 group-hover:scale-110 transition-transform"
                    aria-hidden
                  />
                  <span className="font-bold text-lg">{PHONE_DISPLAY}</span>
                </a>

                <a
                  href={`mailto:${EMAIL}`}
                  aria-label={`Enviar email a ${EMAIL}`}
                  className="flex items-center gap-3 hover:text-accent transition-colors duration-300 group"
                >
                  <FaEnvelope
                    className="text-xl shrink-0 group-hover:scale-110 transition-transform"
                    aria-hidden
                  />
                  <span className="text-sm break-all">{EMAIL}</span>
                </a>

                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-xl shrink-0" aria-hidden />
                  <span>{LOCATION}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:w-2/3 bg-surface-card">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-fade-in">
                <FaCheckCircle
                  className="text-6xl text-success mb-4"
                  aria-hidden
                />
                <h3 className="text-2xl font-bold text-text mb-2">
                  ¡Mensaje Recibido!
                </h3>
                <p className="text-text-muted mb-6">
                  {OWNER_NAME} te llamará lo antes posible.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-accent font-medium hover:text-accent-dark underline transition"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block text-sm font-medium text-text mb-2"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent/30 outline-none"
                      placeholder="Nombre"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="telefono"
                      className="block text-sm font-medium text-text mb-2"
                    >
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent/30 outline-none"
                      placeholder="600..."
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="servicio"
                    className="block text-sm font-medium text-text mb-2"
                  >
                    Servicio
                  </label>
                  <select
                    id="servicio"
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-surface-card outline-none"
                  >
                    {CONTACT_SERVICE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="mensaje"
                    className="block text-sm font-medium text-text mb-2"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-border outline-none"
                    placeholder="Detalles..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className={`w-full font-bold py-4 rounded-lg text-white transition duration-300 shadow-lg ${
                    isSending
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary hover:bg-primary-light hover:-translate-y-1"
                  }`}
                >
                  {isSending
                    ? "Enviando aviso..."
                    : "Solicitar Presupuesto Gratis"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
