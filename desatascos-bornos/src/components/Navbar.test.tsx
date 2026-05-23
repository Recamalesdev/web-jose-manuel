import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Navbar from "./Navbar";
import { PHONE_DISPLAY, PHONE_TEL } from "../constants";

describe("Navbar", () => {
  it("shows the correct phone number on desktop", () => {
    render(<Navbar />);
    const desktopLink = screen.getByRole("link", { name: PHONE_DISPLAY });
    expect(desktopLink).toHaveAttribute("href", `tel:${PHONE_TEL}`);
  });

  it("shows the correct phone number in mobile menu", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole("button", { name: "Abrir menú" }));

    await waitFor(() => {
      expect(
        screen.getByRole("link", { name: /Llamar Ahora/i }),
      ).toHaveAttribute("href", `tel:${PHONE_TEL}`);
    });
  });
});
