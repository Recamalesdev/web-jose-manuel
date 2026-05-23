import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import { BRAND_NAME, OWNER_NAME } from "./constants";

vi.mock("aos", () => ({
  default: {
    init: vi.fn(),
  },
}));

describe("App", () => {
  it("renders all main sections", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: BRAND_NAME,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: new RegExp(`Por qué confiar en ${OWNER_NAME}`, "i"),
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Nuestros Servicios/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Tienes alguna duda/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Contactar por WhatsApp" }),
    ).toBeInTheDocument();
  });
});
