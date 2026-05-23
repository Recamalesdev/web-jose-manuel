import { describe, expect, it } from "vitest";
import indexHtml from "../index.html?raw";
import appleTouchIcon from "../public/apple-touch-icon.png";
import favicon32 from "../public/favicon-32x32.png";
import faviconSvg from "../public/favicon.svg?raw";

describe("favicon", () => {
  it("uses brand colors and 24h badge in svg", () => {
    expect(faviconSvg).toContain("#1a2b48");
    expect(faviconSvg).toContain("#0284c7");
    expect(faviconSvg).toContain("linearGradient");
    expect(faviconSvg).toContain(">24</text>");
    expect(faviconSvg).toContain('aria-label="Desatoros 24h"');
  });

  it("exposes png fallbacks for mobile home screen and tabs", () => {
    expect(indexHtml).toContain('rel="apple-touch-icon" sizes="180x180"');
    expect(indexHtml).toContain("/apple-touch-icon.png");
    expect(indexHtml).toContain("/favicon-32x32.png");
    expect(appleTouchIcon).toContain("apple-touch-icon.png");
    expect(favicon32).toContain("favicon-32x32.png");
  });
});
