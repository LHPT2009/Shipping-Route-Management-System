import { usernameRegex } from "utils/validation/username.regrex";

export const validUsername = (username: string): boolean => {
  return usernameRegex.test(username);
}