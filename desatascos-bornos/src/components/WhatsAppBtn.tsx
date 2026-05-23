import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from "../constants";

export default function WhatsAppBtn() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-success text-white p-4 rounded-full shadow-2xl hover:bg-success-dark hover:scale-110 transition-all duration-300 group flex items-center justify-center"
    >
      <FaWhatsapp className="text-3xl" />

      <span className="absolute right-full mr-4 bg-surface-card text-text text-sm font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm pointer-events-none">
        ¡Escríbenos!
      </span>
    </a>
  );
}
