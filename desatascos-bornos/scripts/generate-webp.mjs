import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = join(root, "public", "images");

const sources = [
  "furgoneta-equipo-urgencias.png",
  "fontaneria.jpg",
  "inspeccion-camara.jpg",
  "desatasco-arqueta-fosa.png",
  "pavimentos.jpg",
];

/** Card crops (16:9) from wide masters — keeps key action visible in h-48 tiles */
const cardCrops = [
  {
    source: "desatasco-servicio-calle.png",
    output: "desatasco-servicio-calle-card.png",
    extract: { left: 0, top: 168, width: 1024, height: 576 },
  },
];

const generated = [];

for (const crop of cardCrops) {
  const inputPath = join(imagesDir, crop.source);
  const outputPath = join(imagesDir, crop.output);

  if (!existsSync(inputPath)) {
    throw new Error(`Missing source image: ${inputPath}`);
  }

  await sharp(inputPath).extract(crop.extract).png().toFile(outputPath);
}

const webpSources = [...sources, ...cardCrops.map((crop) => crop.output)];

for (const source of webpSources) {
  const inputPath = join(imagesDir, source);

  if (!existsSync(inputPath)) {
    throw new Error(`Missing source image: ${inputPath}`);
  }

  const outputPath = join(
    imagesDir,
    source.replace(/\.(png|jpe?g)$/i, ".webp"),
  );

  await sharp(inputPath)
    .webp({ quality: 82, effort: 4 })
    .toFile(outputPath);

  generated.push(outputPath.replace(/\\/g, "/").replace(`${root.replace(/\\/g, "/")}/public`, ""));
}

console.log("Generated WebP:", generated.join(", "));
