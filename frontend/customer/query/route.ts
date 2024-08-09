import { gql } from "@apollo/client";

export const GET_ROUTES = gql`
  query {
    getRoutes {
      id
      name
      user_id
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
