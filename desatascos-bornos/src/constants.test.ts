import { describe, expect, it } from "vitest";
import {
  BRAND_NAME,
  COVERAGE_TOWNS,
  EMAIL,
  HERO_IMAGE,
  OWNER_NAME,
  PHONE_DISPLAY,
  SERVICES,
} from "./constants";

describe("constants", () => {
  it("exports brand and contact data from business card", () => {
    expect(BRAND_NAME).toBe("Desatoros Multiservicio 24h");
    expect(OWNER_NAME).toBe("Manuel López");
    expect(PHONE_DISPLAY).toBe("650 040 212");
    expect(EMAIL).toBe("jlopezmoreno1@icloud.com");
  });

  it("lists five services from the business card", () => {
    expect(SERVICES).toHaveLength(5);
    expect(SERVICES.map((service) => service.title)).toEqual([
      "Fontanería",
      "Inspección con cámara",
      "Limpieza de fosas sépticas",
      "Pavimentos",
      "Tuberías en general",
    ]);
  });

  it("defines the Sierra de Cádiz coverage towns", () => {
    expect(COVERAGE_TOWNS).toContain("Bornos");
    expect(COVERAGE_TOWNS.length).toBeGreaterThanOrEqual(5);
  });

  it("maps services to real photos or matching illustrations", () => {
    expect(HERO_IMAGE).toBe("/images/furgoneta-equipo-urgencias.png");
    expect(SERVICES.map((service) => service.image)).toEqual([
      "/images/fontaneria.jpg",
      "/images/inspeccion-camara.jpg",
      "/images/desatasco-arqueta-fosa.png",
      "/images/pavimentos.jpg",
      "/images/desatasco-servicio-calle-card.png",
    ]);
  });
});
