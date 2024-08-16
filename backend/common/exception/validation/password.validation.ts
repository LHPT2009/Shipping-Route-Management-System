import { passwordRegex } from "utils/validation/password.regex";

export const validPassword = (password: string): boolean => {
  return passwordRegex.test(password);
}