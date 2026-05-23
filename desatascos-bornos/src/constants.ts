export const BRAND_NAME = "Desatoros Multiservicio 24h";
export const BRAND_LOGO = "DESATOROS";
export const BRAND_LOGO_ACCENT = "24H";
export const OWNER_NAME = "Manuel López";
export const LOCATION = "Bornos, Cádiz";

export const COVERAGE_AREA = "Sierra de Cádiz";

export const COVERAGE_TOWNS = [
  "Bornos",
  "Prado del Rey",
  "Villamartín",
  "Algodonales",
  "El Bosque",
  "Ubrique",
  "Arcos de la Frontera",
  "Grazalema",
] as const;

export const PHONE_DISPLAY = "650 040 212";
export const PHONE_TEL = "650040212";
export const WHATSAPP_NUMBER = "34650040212";
export const EMAIL = "jlopezmoreno1@icloud.com";

export const TAGLINE =
  "No dudes en consultar cualquier duda. Pedir presupuesto sin compromiso.";

export const WHATSAPP_MESSAGE =
  "Hola, me gustaría pedir presupuesto sin compromiso.";

export const FACEBOOK_URL =
  "https://www.facebook.com/josemanuel.lopezmoreno.754";

/** Foto real: furgoneta con equipos de alta presión */
export const HERO_IMAGE = "/images/furgoneta-equipo-urgencias.png";

export function toWebpAsset(path: string): string {
  return path.replace(/\.(png|jpe?g)$/i, ".webp");
}

export const HERO_IMAGE_WEBP = toWebpAsset(HERO_IMAGE);

export function buildResponsiveBackgroundImage(
  webpPath: string,
  fallbackPath: string,
): string {
  const fallbackType = fallbackPath.endsWith(".png")
    ? "image/png"
    : "image/jpeg";

  return `image-set(url("${webpPath}") type("image/webp"), url("${fallbackPath}") type("${fallbackType}"))`;
}

export const HERO_BACKGROUND_IMAGE = buildResponsiveBackgroundImage(
  HERO_IMAGE_WEBP,
  HERO_IMAGE,
);

/** URL canónica de producción (Vercel). Actualizar al migrar a dominio .com */
export const SITE_URL = "https://web-jose-manuel-seven.vercel.app";

export const SEO_TITLE = `${BRAND_NAME} | ${OWNER_NAME}`;

export const SEO_DESCRIPTION = `${BRAND_NAME} — ${OWNER_NAME}. Fontanería, inspección con cámara, limpieza de fosas y pavimentos en ${LOCATION}. Llama al ${PHONE_DISPLAY}.`;

export const OG_IMAGE_URL = `${SITE_URL}${HERO_IMAGE}`;

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: "Fontanería",
    description:
      "Reparaciones, instalaciones y mantenimiento de fontanería general. Solución profesional para averías domésticas e industriales.",
    image: "/images/fontaneria.jpg",
  },
  {
    id: 2,
    title: "Inspección con cámara",
    description:
      "Diagnóstico preciso del estado de tus tuberías sin obras innecesarias. Localizamos el problema antes de actuar.",
    image: "/images/inspeccion-camara.jpg",
  },
  {
    id: 3,
    title: "Limpieza de fosas sépticas",
    description:
      "Vaciado y limpieza de fosas sépticas. Eliminamos malos olores y prevenimos atascos en el sistema de saneamiento.",
    image: "/images/desatasco-arqueta-fosa.png",
  },
  {
    id: 4,
    title: "Pavimentos",
    description:
      "Limpieza a alta presión de suelos, garajes y patios. Eliminamos suciedad incrustada con resultados duraderos.",
    image: "/images/pavimentos.jpg",
  },
  {
    id: 5,
    title: "Tuberías en general",
    description:
      "Desatascos urgentes 24h para fregaderos, bajantes y baños. Llegamos rápido con equipos de alta potencia.",
    image: "/images/furgoneta-equipo-urgencias.png",
  },
];

export const RASTER_SERVICE_IMAGES = [
  ...new Set([HERO_IMAGE, ...SERVICES.map((service) => service.image)]),
];

export const CONTACT_SERVICE_OPTIONS = [
  { value: "general", label: "Consulta General" },
  { value: "fontaneria", label: "Fontanería" },
  { value: "camara", label: "Inspección con cámara" },
  { value: "fosas", label: "Limpieza de fosas sépticas" },
  { value: "pavimentos", label: "Pavimentos" },
  { value: "tuberias", label: "Tuberías en general" },
] as const;

export type ServiceType = (typeof CONTACT_SERVICE_OPTIONS)[number]["value"];
