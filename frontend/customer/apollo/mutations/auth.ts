import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
        status
        message
        data
        error
    }
  }
`;

export const SIGNUP = gql`
  mutation Create($input: SignupInput!) {
    signup(input: $input) {
        status
        message
        data
        error
    }
  }
`;

export const CONFIRM_EMAIL = gql`
  mutation ConfirmEmail($input: ConfirmEmailInput!) {
    confirmEmail(input: $input) {
        status
        message
        data
        error
    }
  }
`;

export const RESET_PASSWORD_VERIFY_EMAIL = gql`
  mutation ResetPasswordVerifyEmail($input: ResetPasswordVerifyEmailInput!) {
    resetPasswordVerifyEmail(input: $input) {
        status
        message
        data
        error
    }
  }
`;

export const RESET_PASSWORD = gql`
mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
      status
      message
      data
      error
  }
}
`;