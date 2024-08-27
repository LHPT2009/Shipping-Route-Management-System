import { phoneRegex } from "utils/validation/phone.regex";

export const validPhone = (phone: string): boolean => {
  return phoneRegex.test(phone);
}