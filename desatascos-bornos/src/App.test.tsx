import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";

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
        name: /Desatascos Profesionales en Bornos/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Por qué confían en nosotros/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Nuestros Servicios en la Sierra/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Tienes un problema de tuberías/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Contactar por WhatsApp" }),
    ).toBeInTheDocument();
  });
});
