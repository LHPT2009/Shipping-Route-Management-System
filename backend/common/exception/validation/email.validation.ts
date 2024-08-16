import { emailRegex } from "utils/validation/email.regex";

export const validEmail = (email: string): boolean => {
  return emailRegex.test(email);
}