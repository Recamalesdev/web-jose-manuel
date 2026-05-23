import { describe, expect, it } from "vitest";
import {
  MIN_FORM_DELAY_MS,
  isHoneypotTripped,
  isSubmissionTooFast,
  shouldBlockSubmission,
} from "./contactAntiSpam";

describe("contactAntiSpam", () => {
  it("detects a filled honeypot field", () => {
    expect(isHoneypotTripped("")).toBe(false);
    expect(isHoneypotTripped("   ")).toBe(false);
    expect(isHoneypotTripped("http://spam.example")).toBe(true);
  });

  it("blocks submissions faster than the minimum delay", () => {
    const openedAt = 1_000;

    expect(isSubmissionTooFast(openedAt, openedAt + MIN_FORM_DELAY_MS - 1)).toBe(
      true,
    );
    expect(isSubmissionTooFast(openedAt, openedAt + MIN_FORM_DELAY_MS)).toBe(
      false,
    );
  });

  it("blocks when honeypot is tripped or submission is too fast", () => {
    const openedAt = 5_000;

    expect(shouldBlockSubmission("", openedAt, openedAt + MIN_FORM_DELAY_MS)).toBe(
      false,
    );
    expect(shouldBlockSubmission("bot", openedAt, openedAt + 10_000)).toBe(
      true,
    );
    expect(
      shouldBlockSubmission("", openedAt, openedAt + MIN_FORM_DELAY_MS - 1),
    ).toBe(true);
  });
});
