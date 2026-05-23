import { FaMapMarkedAlt } from "react-icons/fa";
import {
  COVERAGE_AREA,
  COVERAGE_TOWNS,
  LOCATION,
  OWNER_NAME,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "../constants";

export default function CoverageArea() {
  return (
    <section
      id="cobertura"
      aria-labelledby="coverage-heading"
      className="py-20 bg-surface"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 mb-6 rounded-full bg-surface-card shadow-sm">
            <FaMapMarkedAlt className="text-4xl text-accent" aria-hidden />
          </div>
          <h2
            id="coverage-heading"
            className="text-3xl md:text-4xl font-bold text-primary mb-4"
          >
            Zona de cobertura en la {COVERAGE_AREA}
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            {OWNER_NAME} se desplaza desde {LOCATION} para urgencias de
            fontanería y desatascos. Si estás cerca, llámanos al{" "}
            <a
              href={`tel:${PHONE_TEL}`}
              className="font-semibold text-accent hover:text-accent-dark transition"
            >
              {PHONE_DISPLAY}
            </a>
            .
          </p>
        </div>

        <ul className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {COVERAGE_TOWNS.map((town) => (
            <li key={town}>
              <span className="inline-block rounded-full border border-border bg-surface-card px-4 py-2 text-sm font-medium text-text shadow-sm">
                {town}
              </span>
            </li>
          ))}
        </ul>

        <p className="text-center text-text-muted text-sm mt-8 max-w-2xl mx-auto">
          ¿Tu pueblo no aparece en la lista? Consúltanos igualmente: valoramos
          cada solicitud en la comarca.
        </p>
      </div>
    </section>
  );
}
