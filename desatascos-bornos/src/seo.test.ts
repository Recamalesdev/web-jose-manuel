import { describe, expect, it } from "vitest";
import indexHtml from "../index.html?raw";
import {
  BRAND_NAME,
  OG_IMAGE_URL,
  SEO_DESCRIPTION,
  SEO_TITLE,
  SITE_URL,
} from "./constants";

describe("social meta tags", () => {
  it("includes Open Graph tags aligned with SEO constants", () => {
    expect(indexHtml).toContain(`<title>${SEO_TITLE}</title>`);
    expect(indexHtml).toContain(`content="${SEO_DESCRIPTION}"`);
    expect(indexHtml).toContain('property="og:type" content="website"');
    expect(indexHtml).toContain('property="og:locale" content="es_ES"');
    expect(indexHtml).toContain(
      `property="og:site_name" content="${BRAND_NAME}"`,
    );
    expect(indexHtml).toContain(`property="og:title" content="${SEO_TITLE}"`);
    expect(indexHtml).toContain('property="og:description"');
    expect(indexHtml).toContain(`property="og:url" content="${SITE_URL}/"`);
    expect(indexHtml).toContain('property="og:image"');
    expect(indexHtml).toContain(`content="${OG_IMAGE_URL}"`);
    expect(indexHtml).toContain('property="og:image:alt"');
  });

  it("includes Twitter Card tags for large image previews", () => {
    expect(indexHtml).toContain(
      'name="twitter:card" content="summary_large_image"',
    );
    expect(indexHtml).toContain(`name="twitter:title" content="${SEO_TITLE}"`);
    expect(indexHtml).toContain('name="twitter:description"');
    expect(indexHtml).toContain('name="twitter:image"');
    expect(indexHtml).toContain(`content="${OG_IMAGE_URL}"`);
    expect(indexHtml).toContain('name="twitter:image:alt"');
  });
});
