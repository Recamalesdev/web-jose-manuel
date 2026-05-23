import { describe, expect, it } from "vitest";
import indexHtml from "../index.html?raw";
import fontaneriaWebp from "../public/images/fontaneria.webp";
import fosaWebp from "../public/images/desatasco-arqueta-fosa.webp";
import furgonetaWebp from "../public/images/furgoneta-equipo-urgencias.webp";
import inspeccionWebp from "../public/images/inspeccion-camara.webp";
import pavimentosWebp from "../public/images/pavimentos.webp";
import {
  HERO_IMAGE,
  HERO_IMAGE_WEBP,
  RASTER_SERVICE_IMAGES,
  buildResponsiveBackgroundImage,
  toWebpAsset,
} from "./constants";

const generatedWebpAssets = [
  furgonetaWebp,
  fontaneriaWebp,
  inspeccionWebp,
  fosaWebp,
  pavimentosWebp,
];

describe("optimized raster assets", () => {
  it("derives webp paths from raster sources", () => {
    expect(toWebpAsset("/images/fontaneria.jpg")).toBe(
      "/images/fontaneria.webp",
    );
    expect(HERO_IMAGE_WEBP).toBe("/images/furgoneta-equipo-urgencias.webp");
    expect(buildResponsiveBackgroundImage(HERO_IMAGE_WEBP, HERO_IMAGE)).toContain(
      HERO_IMAGE_WEBP,
    );
  });

  it("generates webp files for all raster service images", () => {
    expect(generatedWebpAssets).toHaveLength(RASTER_SERVICE_IMAGES.length);

    for (const assetPath of generatedWebpAssets) {
      expect(assetPath).toMatch(/\.webp$/);
    }
  });

  it("preloads the hero webp image in index.html", () => {
    expect(indexHtml).toContain('rel="preload"');
    expect(indexHtml).toContain('as="image"');
    expect(indexHtml).toContain(`href="${HERO_IMAGE_WEBP}"`);
    expect(indexHtml).toContain('type="image/webp"');
  });
});
