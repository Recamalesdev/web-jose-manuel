import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Contact from "./Contact";
import * as contactAntiSpam from "../contactAntiSpam";
import { HONEYPOT_FIELD_NAME } from "../contactAntiSpam";
import { PHONE_DISPLAY, WHATSAPP_NUMBER } from "../constants";

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

async function submitValidContactForm() {
  const user = userEvent.setup();

  await user.type(screen.getByLabelText("Nombre"), "Juan");
  await user.type(screen.getByLabelText("Teléfono"), "600123456");
  await user.click(
    screen.getByRole("button", { name: "Solicitar Presupuesto Gratis" }),
  );
}

describe("Contact", () => {
  beforeEach(() => {
    mockSend.mockReset();
    mockConfetti.mockReset();
    vi.spyOn(contactAntiSpam, "shouldBlockSubmission").mockReturnValue(false);
    vi.stubEnv("VITE_EMAILJS_SERVICE_ID", "test_service");
    vi.stubEnv("VITE_EMAILJS_TEMPLATE_ID", "test_template");
    vi.stubEnv("VITE_EMAILJS_PUBLIC_KEY", "test_key");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders contact info with accessible links", () => {
    render(<Contact />);

    expect(
      screen.getByRole("link", { name: `Llamar al ${PHONE_DISPLAY}` }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Enviar email a/i }),
    ).toBeInTheDocument();
  });

  it("renders the contact form fields", () => {
    render(<Contact />);

    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Teléfono")).toBeInTheDocument();
    expect(screen.getByLabelText("Servicio")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Solicitar Presupuesto Gratis" }),
    ).toBeInTheDocument();
  });

  it("shows field errors and blocks EmailJS when validation fails", async () => {
    const user = userEvent.setup();

    render(<Contact />);

    await user.type(screen.getByLabelText("Nombre"), "J");
    await user.type(screen.getByLabelText("Teléfono"), "123");
    await user.click(
      screen.getByRole("button", { name: "Solicitar Presupuesto Gratis" }),
    );

    expect(
      screen.getByText("El nombre debe tener al menos 2 caracteres."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Introduce un teléfono válido (9 dígitos o prefijo +34)."),
    ).toBeInTheDocument();
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("silently accepts blocked submissions without calling EmailJS", async () => {
    vi.mocked(contactAntiSpam.shouldBlockSubmission).mockReturnValue(true);

    render(<Contact />);
    await submitValidContactForm();

    await waitFor(() => {
      expect(screen.getByText("¡Mensaje Recibido!")).toBeInTheDocument();
    });

    expect(mockSend).not.toHaveBeenCalled();
    expect(mockConfetti).not.toHaveBeenCalled();
  });

  it("checks anti-spam rules with the honeypot value and form open time", async () => {
    vi.mocked(contactAntiSpam.shouldBlockSubmission).mockImplementation(
      (honeypot, formOpenedAt) =>
        contactAntiSpam.isHoneypotTripped(honeypot) ||
        contactAntiSpam.isSubmissionTooFast(formOpenedAt, formOpenedAt + 100),
    );

    render(<Contact />);
    const user = userEvent.setup();
    const honeypot = document.querySelector(
      `input[name="${HONEYPOT_FIELD_NAME}"]`,
    ) as HTMLInputElement;

    await user.type(screen.getByLabelText("Nombre"), "Juan");
    await user.type(screen.getByLabelText("Teléfono"), "600123456");
    await user.type(honeypot, "http://spam.example");
    await user.click(
      screen.getByRole("button", { name: "Solicitar Presupuesto Gratis" }),
    );

    await waitFor(() => {
      expect(screen.getByText("¡Mensaje Recibido!")).toBeInTheDocument();
    });

    expect(mockSend).not.toHaveBeenCalled();
  });

  it("shows success message after successful submission", async () => {
    mockSend.mockResolvedValue({ status: 200, text: "OK" });

    render(<Contact />);
    await submitValidContactForm();

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

  it("shows inline fallback with WhatsApp on submission failure", async () => {
    mockSend.mockRejectedValue(new Error("Network error"));

    render(<Contact />);
    await submitValidContactForm();

    await waitFor(() => {
      expect(
        screen.getByText("No pudimos enviar tu solicitud"),
      ).toBeInTheDocument();
    });

    const whatsappLink = screen.getByRole("link", {
      name: "Continuar por WhatsApp",
    });
    expect(whatsappLink).toHaveAttribute(
      "href",
      expect.stringContaining(`wa.me/${WHATSAPP_NUMBER}`),
    );
    expect(whatsappLink).toHaveAttribute("target", "_blank");
  });
});
