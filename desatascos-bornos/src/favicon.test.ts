import { describe, expect, it } from "vitest";
import faviconSvg from "../public/favicon.svg?raw";

describe("favicon", () => {
  it("uses brand colors and 24h badge", () => {
    expect(faviconSvg).toContain("#1a2b48");
    expect(faviconSvg).toContain("#0284c7");
    expect(faviconSvg).toContain("linearGradient");
    expect(faviconSvg).toContain(">24</text>");
    expect(faviconSvg).toContain('aria-label="Desatoros 24h"');
  });
});
