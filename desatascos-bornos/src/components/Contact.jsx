import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    servicio: "general",
    mensaje: "",
  });

  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
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
        "service_dlks0i9",
        "template_2lofc6f",
        templateParams,
        "3jVXdNczWreoBMglL",
      )
      .then((response) => {
        console.log("ÉXITO!", response.status, response.text);

        confetti({
          particleCount: 150,
          spread: 70, // Cuánto se abren
          origin: { y: 0.6 }, // Altura desde donde salen)
        });

        alert(
          "¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.",
        );
        setFormData({
          nombre: "",
          telefono: "",
          servicio: "general",
          mensaje: "",
        });
        setIsSending(false);
      })
      .catch((err) => {
        console.log("FALLO...", err);
        alert(
          "Hubo un error al enviar. Por favor, llama directamente al 650 040 212.",
        );
        setIsSending(false);
      });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            ¿Tienes un problema de tuberías?
          </h2>
          <p className="text-gray-600">
            Déjanos tus datos y te llamamos nosotros.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden md:flex">
          <div className="bg-blue-600 p-8 md:w-1/3 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-4">Información Directa</h3>
              <p className="mb-4 text-blue-100 text-sm">
                Urgencias 24h disponibles.
              </p>
              <div className="space-y-4">
                <a
                  href="tel:650040212"
                  className="flex items-center gap-3 hover:text-blue-200 transition-colors duration-300 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    📞
                  </span>
                  <span className="font-bold text-lg">650 040 212</span>
                </a>

                <div className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <span>Bornos, Cádiz</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="Nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="600..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Servicio
                </label>
                <select
                  name="servicio"
                  value={formData.servicio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white outline-none"
                >
                  <option value="general">Consulta General</option>
                  <option value="urgencia">🚨 Urgencia 24h</option>
                  <option value="arquetas">Limpieza de Arquetas</option>
                  <option value="pavimentos">Limpieza de Pavimentos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"
                  placeholder="Detalles..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className={`w-full font-bold py-4 rounded-lg text-white transition duration-300 shadow-lg ${
                  isSending
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-900 hover:bg-blue-800 hover:-translate-y-1"
                }`}
              >
                {isSending
                  ? "Enviando aviso..."
                  : "Solicitar Presupuesto Gratis"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
