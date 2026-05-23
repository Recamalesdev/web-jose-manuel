import {
  BRAND_NAME,
  COVERAGE_AREA,
  COVERAGE_TOWNS,
  EMAIL,
  FACEBOOK_URL,
  LOCATION,
  OG_IMAGE_URL,
  OWNER_NAME,
  PHONE_TEL,
  SEO_DESCRIPTION,
  SERVICES,
  SITE_URL,
} from "./constants";

export interface LocalBusinessJsonLd {
  "@context": "https://schema.org";
  "@type": "LocalBusiness";
  name: string;
  description: string;
  url: string;
  image: string;
  telephone: string;
  email: string;
  founder: {
    "@type": "Person";
    name: string;
  };
  address: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  areaServed: Array<
    | { "@type": "AdministrativeArea"; name: string }
    | { "@type": "City"; name: string }
  >;
  sameAs: string[];
  knowsAbout: string[];
}

export function buildLocalBusinessJsonLd(): LocalBusinessJsonLd {
  const [locality, region] = LOCATION.split(",").map((part) => part.trim());

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND_NAME,
    description: SEO_DESCRIPTION,
    url: `${SITE_URL}/`,
    image: OG_IMAGE_URL,
    telephone: `+34${PHONE_TEL}`,
    email: EMAIL,
    founder: {
      "@type": "Person",
      name: OWNER_NAME,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: locality,
      addressRegion: region,
      addressCountry: "ES",
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: COVERAGE_AREA,
      },
      ...COVERAGE_TOWNS.map((name) => ({
        "@type": "City" as const,
        name,
      })),
    ],
    sameAs: [FACEBOOK_URL],
    knowsAbout: SERVICES.map((service) => service.title),
  };
}

export function injectLocalBusinessJsonLd(): void {
  if (document.querySelector('script[data-schema="local-business"]')) {
    return;
  }

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-schema", "local-business");
  script.textContent = JSON.stringify(buildLocalBusinessJsonLd());
  document.head.appendChild(script);
}
