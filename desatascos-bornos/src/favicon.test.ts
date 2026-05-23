import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const faviconPath = resolve(__dirname, "../public/favicon.svg");

describe("favicon", () => {
  it("uses brand colors and 24h badge", () => {
    const svg = readFileSync(faviconPath, "utf-8");

    expect(svg).toContain("#1a2b48");
    expect(svg).toContain("#0ea5e9");
    expect(svg).toContain(">24</text>");
    expect(svg).toContain('aria-label="Desatoros 24h"');
  });
});
