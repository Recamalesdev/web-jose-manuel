import { z } from "zod";
import {
  CONTACT_SERVICE_OPTIONS,
  WHATSAPP_MESSAGE,
  WHATSAPP_NUMBER,
  type ServiceType,
} from "./constants";

const SERVICE_VALUES = CONTACT_SERVICE_OPTIONS.map(
  (option) => option.value,
) as [ServiceType, ...ServiceType[]];

const SPANISH_PHONE_REGEX = /^(\+34|0034)?[6789]\d{8}$/;

function normalizePhone(value: string): string {
  return value.replace(/[\s-]/g, "");
}

export const contactSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(100, "El nombre no puede superar 100 caracteres."),
  telefono: z
    .string()
    .trim()
    .transform(normalizePhone)
    .pipe(
      z
        .string()
        .regex(
          SPANISH_PHONE_REGEX,
          "Introduce un teléfono válido (9 dígitos o prefijo +34).",
        ),
    ),
  servicio: z.enum(SERVICE_VALUES),
  mensaje: z
    .string()
    .max(1000, "El mensaje no puede superar 1000 caracteres.")
    .optional()
    .default(""),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export function mapContactFieldErrors(
  error: z.ZodError<ContactFormData>,
): Partial<Record<keyof ContactFormData, string>> {
  const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (
      typeof field === "string" &&
      fieldErrors[field as keyof ContactFormData] === undefined
    ) {
      fieldErrors[field as keyof ContactFormData] = issue.message;
    }
  }

  return fieldErrors;
}

export function buildContactWhatsAppUrl(data: ContactFormData): string {
  const serviceLabel =
    CONTACT_SERVICE_OPTIONS.find((option) => option.value === data.servicio)
      ?.label ?? data.servicio;

  const details = [
    WHATSAPP_MESSAGE,
    `Nombre: ${data.nombre}`,
    `Teléfono: ${data.telefono}`,
    `Servicio: ${serviceLabel}`,
  ];

  if (data.mensaje.trim()) {
    details.push(`Mensaje: ${data.mensaje.trim()}`);
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(details.join("\n"))}`;
}
