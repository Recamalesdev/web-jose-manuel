import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "./Footer";
import { EMAIL, LOCATION, PHONE_DISPLAY } from "../constants";

describe("Footer", () => {
  it("renders contact links with accessible labels", () => {
    render(<Footer />);

    expect(
      screen.getByRole("link", { name: `Llamar al ${PHONE_DISPLAY}` }),
    ).toHaveAttribute("href", expect.stringContaining("tel:"));
    expect(
      screen.getByRole("link", { name: `Enviar email a ${EMAIL}` }),
    ).toHaveAttribute("href", expect.stringContaining("mailto:"));
    expect(screen.getByText(LOCATION)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Ver trabajos/i }),
    ).toBeInTheDocument();
  });

  it("does not render emoji contact icons", () => {
    render(<Footer />);

    expect(screen.queryByText("📞")).not.toBeInTheDocument();
    expect(screen.queryByText("✉️")).not.toBeInTheDocument();
    expect(screen.queryByText("📍")).not.toBeInTheDocument();
  });
});
