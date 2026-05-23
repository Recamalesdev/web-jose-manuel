export const HONEYPOT_FIELD_NAME = "empresa_web";

/** Minimum time (ms) the form must stay open before a human submission. */
export const MIN_FORM_DELAY_MS = 2000;

export function isHoneypotTripped(value: string): boolean {
  return value.trim().length > 0;
}

export function isSubmissionTooFast(
  formOpenedAt: number,
  now = Date.now(),
): boolean {
  return now - formOpenedAt < MIN_FORM_DELAY_MS;
}

export function shouldBlockSubmission(
  honeypot: string,
  formOpenedAt: number,
  now = Date.now(),
): boolean {
  return isHoneypotTripped(honeypot) || isSubmissionTooFast(formOpenedAt, now);
}
