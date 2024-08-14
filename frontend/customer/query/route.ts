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

export const POST_ROUTES = gql`
  query {
    getRoutes {
      id
      name
      user_id
    }
  }
`;
