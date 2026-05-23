import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CoverageArea from "./CoverageArea";
import {
  COVERAGE_AREA,
  COVERAGE_TOWNS,
  LOCATION,
  PHONE_DISPLAY,
} from "../constants";

describe("CoverageArea", () => {
  it("renders the coverage heading and service area copy", () => {
    render(<CoverageArea />);

    expect(
      screen.getByRole("heading", {
        name: new RegExp(`Zona de cobertura en la ${COVERAGE_AREA}`, "i"),
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(LOCATION, "i"))).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: PHONE_DISPLAY }),
    ).toHaveAttribute("href", expect.stringContaining("tel:"));
  });

  it("lists all configured coverage towns", () => {
    render(<CoverageArea />);

    for (const town of COVERAGE_TOWNS) {
      expect(screen.getByText(town)).toBeInTheDocument();
    }
  });
});
