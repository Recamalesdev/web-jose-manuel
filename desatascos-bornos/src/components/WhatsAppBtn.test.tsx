import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import WhatsAppBtn from "./WhatsAppBtn";
import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from "../constants";

describe("WhatsAppBtn", () => {
  it("renders a WhatsApp link with accessible label and safe external attrs", () => {
    render(<WhatsAppBtn />);

    const link = screen.getByRole("link", { name: "Contactar por WhatsApp" });

    expect(link).toHaveAttribute(
      "href",
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("shows the hover hint text in the document", () => {
    render(<WhatsAppBtn />);

    expect(screen.getByText("¡Escríbenos!")).toBeInTheDocument();
  });
});
