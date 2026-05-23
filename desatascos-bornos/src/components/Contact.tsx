import { useState, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";
import {
  FaCheckCircle,
  FaEnvelope,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import {
  HONEYPOT_FIELD_NAME,
  shouldBlockSubmission,
} from "../contactAntiSpam";
import {
  buildContactWhatsAppUrl,
  contactSchema,
  mapContactFieldErrors,
  type ContactFormData,
} from "../contactSchema";
import {
  CONTACT_SERVICE_OPTIONS,
  EMAIL,
  LOCATION,
  OWNER_NAME,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "../constants";

type FormStatus = "idle" | "sending" | "submitted" | "submitError";

const initialFormData: ContactFormData = {
  nombre: "",
  telefono: "",
  servicio: "general",
  mensaje: "",
};

export default function Contact() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const [validatedData, setValidatedData] = useState<ContactFormData | null>(
    null,
  );
  const [honeypot, setHoneypot] = useState("");
  const [formOpenedAt, setFormOpenedAt] = useState(() => Date.now());

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const field = name as keyof ContactFormData;

    setFormData((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }

      const next = { ...prev };
      delete next[field];
      return next;
    });

    if (formStatus === "submitError") {
      setFormStatus("idle");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = contactSchema.safeParse(formData);

    if (!parsed.success) {
      setFieldErrors(mapContactFieldErrors(parsed.error));
      setFormStatus("idle");
      return;
    }

    if (shouldBlockSubmission(honeypot, formOpenedAt)) {
      setFieldErrors({});
      setFormData(initialFormData);
      setHoneypot("");
      setValidatedData(null);
      setFormStatus("submitted");
      setFormOpenedAt(Date.now());
      return;
    }

    setFieldErrors({});
    setValidatedData(parsed.data);
    setFormStatus("sending");

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          nombre: parsed.data.nombre,
          telefono: parsed.data.telefono,
          servicio: parsed.data.servicio,
          mensaje: parsed.data.mensaje,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
        });

        setFormData(initialFormData);
        setHoneypot("");
        setValidatedData(null);
        setFormStatus("submitted");
        setFormOpenedAt(Date.now());
      })
      .catch(() => {
        setFormStatus("submitError");
      });
  };

  const whatsappFallbackUrl =
    validatedData !== null
      ? buildContactWhatsAppUrl(validatedData)
      : buildContactWhatsAppUrl(formData);

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
            {formStatus === "submitted" ? (
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
                  onClick={() => {
                    setFormStatus("idle");
                    setFormOpenedAt(Date.now());
                  }}
                  className="text-accent font-medium hover:text-accent-dark underline transition"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div
                  className="absolute left-[-9999px] h-px w-px overflow-hidden"
                  aria-hidden="true"
                >
                  <label htmlFor={HONEYPOT_FIELD_NAME}>No rellenar este campo</label>
                  <input
                    type="text"
                    id={HONEYPOT_FIELD_NAME}
                    name={HONEYPOT_FIELD_NAME}
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {formStatus === "submitError" && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 p-4 space-y-4"
                  >
                    <div className="flex gap-3">
                      <FaExclamationTriangle
                        className="text-red-600 text-xl shrink-0 mt-0.5"
                        aria-hidden
                      />
                      <div>
                        <p className="font-semibold text-red-800">
                          No pudimos enviar tu solicitud
                        </p>
                        <p className="text-sm text-red-700 mt-1">
                          Puede ser un problema temporal de red o del servicio
                          de correo. Escríbenos por WhatsApp y te atenderemos
                          al momento, o llama al {PHONE_DISPLAY}.
                        </p>
                      </div>
                    </div>
                    <a
                      href={whatsappFallbackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 bg-success text-white font-bold py-3 px-4 rounded-lg hover:bg-success-dark transition"
                    >
                      <FaWhatsapp aria-hidden />
                      Continuar por WhatsApp
                    </a>
                  </div>
                )}

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
                      aria-invalid={Boolean(fieldErrors.nombre)}
                      aria-describedby={
                        fieldErrors.nombre ? "nombre-error" : undefined
                      }
                      className={`w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-accent/30 ${
                        fieldErrors.nombre ? "border-red-500" : "border-border"
                      }`}
                      placeholder="Nombre"
                    />
                    {fieldErrors.nombre && (
                      <p
                        id="nombre-error"
                        className="mt-2 text-sm text-red-600"
                        role="alert"
                      >
                        {fieldErrors.nombre}
                      </p>
                    )}
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
                      aria-invalid={Boolean(fieldErrors.telefono)}
                      aria-describedby={
                        fieldErrors.telefono ? "telefono-error" : undefined
                      }
                      className={`w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-accent/30 ${
                        fieldErrors.telefono
                          ? "border-red-500"
                          : "border-border"
                      }`}
                      placeholder="600..."
                    />
                    {fieldErrors.telefono && (
                      <p
                        id="telefono-error"
                        className="mt-2 text-sm text-red-600"
                        role="alert"
                      >
                        {fieldErrors.telefono}
                      </p>
                    )}
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
                    aria-invalid={Boolean(fieldErrors.mensaje)}
                    aria-describedby={
                      fieldErrors.mensaje ? "mensaje-error" : undefined
                    }
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border outline-none ${
                      fieldErrors.mensaje ? "border-red-500" : "border-border"
                    }`}
                    placeholder="Detalles..."
                  />
                  {fieldErrors.mensaje && (
                    <p
                      id="mensaje-error"
                      className="mt-2 text-sm text-red-600"
                      role="alert"
                    >
                      {fieldErrors.mensaje}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className={`w-full font-bold py-4 rounded-lg text-white transition duration-300 shadow-lg ${
                    formStatus === "sending"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary hover:bg-primary-light hover:-translate-y-1"
                  }`}
                >
                  {formStatus === "sending"
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
