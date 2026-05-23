import { useState } from "react";
import { FaBars, FaTimes, FaPhoneAlt } from "react-icons/fa";
import { PHONE_DISPLAY, PHONE_TEL } from "../constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => window.scrollTo(0, 0)}
          >
            <span className="text-2xl font-black text-blue-900 tracking-tighter">
              DESATASCOS<span className="text-blue-600">MANUEL</span>
            </span>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <a
              href="#inicio"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Inicio
            </a>
            <a
              href="#servicios"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Servicios
            </a>
            <a
              href="#contacto"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Contacto
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/30"
            >
              <FaPhoneAlt className="text-sm" />
              <span>{PHONE_DISPLAY}</span>
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            <a
              href="#inicio"
              onClick={handleLinkClick}
              className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            >
              Inicio
            </a>
            <a
              href="#servicios"
              onClick={handleLinkClick}
              className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            >
              Servicios
            </a>
            <a
              href="#contacto"
              onClick={handleLinkClick}
              className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            >
              Contacto
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-4 flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-3 rounded-xl font-bold"
            >
              <FaPhoneAlt /> Llamar Ahora
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
