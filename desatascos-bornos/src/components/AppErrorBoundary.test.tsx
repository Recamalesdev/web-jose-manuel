import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import AppErrorBoundary from "./AppErrorBoundary";
import { WHATSAPP_NUMBER } from "../constants";

function BrokenChild(): never {
  throw new Error("Render crash");
}

describe("AppErrorBoundary", () => {
  it("renders fallback UI when a child throws during render", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <AppErrorBoundary>
        <BrokenChild />
      </AppErrorBoundary>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Algo salió mal");
    expect(
      screen.getByRole("link", { name: "Escribir por WhatsApp" }),
    ).toHaveAttribute("href", expect.stringContaining(`wa.me/${WHATSAPP_NUMBER}`));
  });

  it("reloads the page when the user clicks recargar", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const reloadSpy = vi.fn();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: reloadSpy },
    });

    const user = userEvent.setup();

    render(
      <AppErrorBoundary>
        <BrokenChild />
      </AppErrorBoundary>,
    );

    await user.click(screen.getByRole("button", { name: "Recargar página" }));
    expect(reloadSpy).toHaveBeenCalled();
  });
});
