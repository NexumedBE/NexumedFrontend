// utils/cookieConsent.ts
import { Cookies } from "react-cookie-consent";

/**
 * Checks if the user has accepted cookies.
 * @returns {boolean} True if cookies are accepted, false otherwise.
 */
export const hasAcceptedCookies = (): boolean => {
  return Cookies.get("siteCookieConsent") === "true";
};

/**
 * Handles actions based on the user's cookie consent.
 * Typically used to initialize services like analytics.
 */
export const handleCookieActions = (): void => {
  if (hasAcceptedCookies()) {
    console.log("Cookies accepted: Initializing analytics.");
    // Add initialization logic for analytics or other services
  } else {
    console.log("Cookies not accepted: Skipping analytics initialization.");
  }
};
