import { describe, expect, it } from "vitest";
import {
  buildContactWhatsAppUrl,
  contactSchema,
  mapContactFieldErrors,
} from "./contactSchema";
import { WHATSAPP_NUMBER } from "./constants";

describe("contactSchema", () => {
  it("accepts valid contact data", () => {
    const result = contactSchema.safeParse({
      nombre: "  Juan Pérez  ",
      telefono: "600123456",
      servicio: "fontaneria",
      mensaje: "Necesito presupuesto",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.nombre).toBe("Juan Pérez");
      expect(result.data.telefono).toBe("600123456");
    }
  });

  it("accepts phone numbers with +34 prefix", () => {
    const result = contactSchema.safeParse({
      nombre: "María",
      telefono: "+34 650 040 212",
      servicio: "general",
    });

    expect(result.success).toBe(true);
  });

  it("rejects empty or short names", () => {
    const result = contactSchema.safeParse({
      nombre: " J ",
      telefono: "600123456",
      servicio: "general",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(mapContactFieldErrors(result.error).nombre).toMatch(/2 caracteres/);
    }
  });

  it("rejects invalid phone numbers", () => {
    const result = contactSchema.safeParse({
      nombre: "Juan",
      telefono: "123",
      servicio: "general",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(mapContactFieldErrors(result.error).telefono).toMatch(/teléfono válido/i);
    }
  });

  it("rejects invalid service values", () => {
    const result = contactSchema.safeParse({
      nombre: "Juan",
      telefono: "600123456",
      servicio: "invalid",
    });

    expect(result.success).toBe(false);
  });

  it("rejects messages longer than 1000 characters", () => {
    const result = contactSchema.safeParse({
      nombre: "Juan",
      telefono: "600123456",
      servicio: "general",
      mensaje: "a".repeat(1001),
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(mapContactFieldErrors(result.error).mensaje).toMatch(/1000 caracteres/);
    }
  });
});

describe("buildContactWhatsAppUrl", () => {
  it("builds a wa.me link with encoded form context", () => {
    const url = buildContactWhatsAppUrl({
      nombre: "Juan",
      telefono: "600123456",
      servicio: "fontaneria",
      mensaje: "Urgente",
    });

    expect(url).toContain(`https://wa.me/${WHATSAPP_NUMBER}?text=`);
    expect(decodeURIComponent(url.split("text=")[1] ?? "")).toContain("Juan");
    expect(decodeURIComponent(url.split("text=")[1] ?? "")).toContain(
      "Fontanería",
    );
  });
});
