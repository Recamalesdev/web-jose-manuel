import { describe, expect, it } from "vitest";
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
import { buildLocalBusinessJsonLd, injectLocalBusinessJsonLd } from "./localBusinessSchema";

describe("buildLocalBusinessJsonLd", () => {
  it("builds a LocalBusiness schema from business constants", () => {
    const schema = buildLocalBusinessJsonLd();
    const [locality, region] = LOCATION.split(",").map((part) => part.trim());

    expect(schema).toEqual({
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
    });
  });

  it("serializes to valid JSON without script-breaking sequences", () => {
    const serialized = JSON.stringify(buildLocalBusinessJsonLd());

    expect(serialized).not.toContain("</script>");
    expect(JSON.parse(serialized)["@type"]).toBe("LocalBusiness");
  });

  it("injects a single LocalBusiness script into the document head", () => {
    document.head.innerHTML = "";

    injectLocalBusinessJsonLd();
    injectLocalBusinessJsonLd();

    const scripts = document.querySelectorAll(
      'script[data-schema="local-business"]',
    );

    expect(scripts).toHaveLength(1);
    expect(scripts[0]?.textContent).toBe(
      JSON.stringify(buildLocalBusinessJsonLd()),
    );
  });
});
