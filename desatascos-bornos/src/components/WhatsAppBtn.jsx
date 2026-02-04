import React from "react";
// Importamos el icono específico de la librería
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppBtn() {
  const phoneNumber = "650040212";
  const message = "Hola, me gustaría pedir presupuesto para un desatasco.";

  // Creamos el enlace oficial de la API de WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all duration-300 group flex items-center justify-center"
    >
      <FaWhatsapp className="text-3xl" />

      {/* Tooltip opcional: Texto que aparece al pasar el ratón */}
      <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm pointer-events-none">
        ¡Escríbenos!
      </span>
    </a>
  );
}
