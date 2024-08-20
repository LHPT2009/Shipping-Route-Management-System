import { usernameEmailRegex } from "utils/validation/username-email.regrex";

export const validUsernameOrEmail = (username: string): boolean => {
  return usernameEmailRegex.test(username);
}