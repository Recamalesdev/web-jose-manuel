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

const generated = [];

for (const source of sources) {
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
