import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Contact from "./Contact";
import { PHONE_DISPLAY } from "../constants";

vi.mock("@emailjs/browser", () => ({
  default: {
    send: vi.fn(),
  },
}));

vi.mock("canvas-confetti", () => ({
  default: vi.fn(),
}));

import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";

const mockSend = vi.mocked(emailjs.send);
const mockConfetti = vi.mocked(confetti);

describe("Contact", () => {
  beforeEach(() => {
    mockSend.mockReset();
    mockConfetti.mockReset();
    vi.stubEnv("VITE_EMAILJS_SERVICE_ID", "test_service");
    vi.stubEnv("VITE_EMAILJS_TEMPLATE_ID", "test_template");
    vi.stubEnv("VITE_EMAILJS_PUBLIC_KEY", "test_key");
  });

  it("renders the contact form with required fields", () => {
    render(<Contact />);

    expect(screen.getByLabelText("Nombre")).toBeRequired();
    expect(screen.getByLabelText("Teléfono")).toBeRequired();
    expect(screen.getByLabelText("Servicio")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Solicitar Presupuesto Gratis" }),
    ).toBeInTheDocument();
  });

  it("shows success message after successful submission", async () => {
    mockSend.mockResolvedValue({ status: 200, text: "OK" });
    const user = userEvent.setup();

    render(<Contact />);

    await user.type(screen.getByLabelText("Nombre"), "Juan");
    await user.type(screen.getByLabelText("Teléfono"), "600123456");
    await user.click(
      screen.getByRole("button", { name: "Solicitar Presupuesto Gratis" }),
    );

    await waitFor(() => {
      expect(screen.getByText("¡Mensaje Recibido!")).toBeInTheDocument();
    });

    expect(mockSend).toHaveBeenCalledWith(
      "test_service",
      "test_template",
      expect.objectContaining({
        nombre: "Juan",
        telefono: "600123456",
      }),
      "test_key",
    );
    expect(mockConfetti).toHaveBeenCalled();
  });

  it("shows alert on submission failure", async () => {
    mockSend.mockRejectedValue(new Error("Network error"));
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const user = userEvent.setup();

    render(<Contact />);

    await user.type(screen.getByLabelText("Nombre"), "Juan");
    await user.type(screen.getByLabelText("Teléfono"), "600123456");
    await user.click(
      screen.getByRole("button", { name: "Solicitar Presupuesto Gratis" }),
    );

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        `Hubo un error. Llama al ${PHONE_DISPLAY}.`,
      );
    });

    alertSpy.mockRestore();
  });
});
