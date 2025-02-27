import libphonenumber from "google-libphonenumber";

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

/**
 * Validates a phone number using google-libphonenumber.
 * @param phoneNumber - The phone number to validate.
 * @param countryCode - The country code (e.g., "US", "BE").
 * @returns True if the phone number is valid, false otherwise.
 */
export const isValidPhoneNumber = (phoneNumber: string, countryCode: string): boolean => {
  try {
    const parsedNumber = phoneUtil.parse(phoneNumber, countryCode);
    return phoneUtil.isValidNumber(parsedNumber);
  } catch (error) {
    return false;
  }
};
