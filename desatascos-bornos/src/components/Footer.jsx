import React from "react";
import { FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-black mb-4 tracking-tighter">
          DESATASCOS<span className="text-red-500">MANUEL</span>
        </h3>

        <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
          Tu servicio de confianza en Bornos y la Sierra de Cádiz. Especialistas
          en desatascos urgentes y limpieza de pavimentos.
        </p>

        <div className="flex justify-center gap-6 mb-8 text-sm font-medium">
          <a href="tel:650040212" className="hover:text-red-400 transition">
            📞 650 040 212
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61566859876226"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition flex items-center gap-2"
          >
            <FaFacebook size={20} />
            <span>Ver trabajos</span>
          </a>
          <span>📍 Bornos, Cádiz</span>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} Desatascos Manuel. Todos los
            derechos reservados.
          </p>

          <div className="mt-4 text-xs text-gray-600">
            <span>Diseño y Desarrollo web por </span>
            <a
              href="https://www.linkedin.com/feed/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-bold transition"
            >
              Bernardo Recamales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
