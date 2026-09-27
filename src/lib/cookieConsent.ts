export const COOKIE_CONSENT_KEY = "nikas_cookie_consent";
export const COOKIE_CONSENT_EVENT = "nikas-cookie-consent";

export type CookieConsentValue = "accepted" | "declined";

export const getCookieConsent = (): CookieConsentValue | null => {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (value === "accepted" || value === "declined") return value;
  } catch {
    return null;
  }
  return null;
};

export const setCookieConsent = (value: CookieConsentValue) => {
  localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }));
};
