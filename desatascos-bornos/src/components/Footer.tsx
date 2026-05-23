import { FaFacebook } from "react-icons/fa";
import {
  BRAND_LOGO,
  BRAND_LOGO_ACCENT,
  BRAND_NAME,
  EMAIL,
  FACEBOOK_URL,
  LOCATION,
  OWNER_NAME,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "../constants";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-black mb-2 tracking-tighter">
          {BRAND_LOGO}
          <span className="text-accent">{BRAND_LOGO_ACCENT}</span>
        </h3>
        <p className="text-gray-300 text-sm mb-6">{OWNER_NAME}</p>

        <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
          {BRAND_NAME}. Fontanería, inspección con cámara, limpieza de fosas
          sépticas, pavimentos y tuberías en general.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm font-medium">
          <a
            href={`tel:${PHONE_TEL}`}
            className="hover:text-accent transition"
          >
            📞 {PHONE_DISPLAY}
          </a>

          <a
            href={`mailto:${EMAIL}`}
            className="hover:text-accent transition"
          >
            ✉️ {EMAIL}
          </a>

          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-dark transition flex items-center gap-2"
          >
            <FaFacebook size={20} />
            <span>Ver trabajos</span>
          </a>

          <span>📍 {LOCATION}</span>
        </div>

        <div className="border-t border-primary-light pt-8">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} {BRAND_NAME}. Todos los derechos
            reservados.
          </p>

          <div className="mt-4 text-xs text-gray-500">
            <span>Diseño y Desarrollo web por </span>
            <a
              href="https://www.linkedin.com/feed/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-dark font-bold transition"
            >
              Bernardo Recamales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
