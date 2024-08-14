import { gql } from "@apollo/client";

export const GET_ROUTES = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
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
