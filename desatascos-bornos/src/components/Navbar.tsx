import { useState } from "react";
import { FaBars, FaTimes, FaPhoneAlt } from "react-icons/fa";
import {
  BRAND_LOGO,
  BRAND_LOGO_ACCENT,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "../constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="fixed w-full z-50 bg-surface-card/95 backdrop-blur-sm shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div
            className="shrink-0 cursor-pointer"
            onClick={() => window.scrollTo(0, 0)}
          >
            <span className="text-2xl font-black text-primary tracking-tighter">
              {BRAND_LOGO}
              <span className="text-accent">{BRAND_LOGO_ACCENT}</span>
            </span>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <a
              href="#inicio"
              className="text-text-muted hover:text-accent font-medium transition"
            >
              Inicio
            </a>
            <a
              href="#servicios"
              className="text-text-muted hover:text-accent font-medium transition"
            >
              Servicios
            </a>
            <a
              href="#contacto"
              className="text-text-muted hover:text-accent font-medium transition"
            >
              Contacto
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center gap-2 bg-accent text-white px-6 py-2.5 rounded-full font-bold hover:bg-accent-dark transition shadow-lg hover:shadow-accent/30"
            >
              <FaPhoneAlt className="text-sm" />
              <span>{PHONE_DISPLAY}</span>
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-muted hover:text-accent focus:outline-none"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-surface-card border-t border-border absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            <a
              href="#inicio"
              onClick={handleLinkClick}
              className="block px-3 py-3 text-base font-medium text-text-muted hover:text-accent hover:bg-surface rounded-md"
            >
              Inicio
            </a>
            <a
              href="#servicios"
              onClick={handleLinkClick}
              className="block px-3 py-3 text-base font-medium text-text-muted hover:text-accent hover:bg-surface rounded-md"
            >
              Servicios
            </a>
            <a
              href="#contacto"
              onClick={handleLinkClick}
              className="block px-3 py-3 text-base font-medium text-text-muted hover:text-accent hover:bg-surface rounded-md"
            >
              Contacto
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-4 flex items-center justify-center gap-2 bg-accent text-white px-3 py-3 rounded-xl font-bold"
            >
              <FaPhoneAlt /> Llamar Ahora
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
