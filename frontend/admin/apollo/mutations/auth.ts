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