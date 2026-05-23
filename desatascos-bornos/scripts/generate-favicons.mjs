import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(join(root, "public/favicon.svg"));

const outputs = [
  { size: 32, file: "favicon-32x32.png" },
  { size: 180, file: "apple-touch-icon.png" },
];

await Promise.all(
  outputs.map(({ size, file }) =>
    sharp(svg).resize(size, size).png().toFile(join(root, "public", file)),
  ),
);

console.log("Generated:", outputs.map(({ file }) => file).join(", "));
