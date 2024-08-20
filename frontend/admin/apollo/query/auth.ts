import { gql } from "@apollo/client";

export const POST_ROUTES = gql`
  query {
    getRoutes {
      id
      name
      user_id
    }
  }
`;

export const GET_NEW_ACCESS_TOKEN = gql`
  query GetRefreshAccessToken{
    getRefreshAccessToken {
        status
        message
        data
        error
    }
  }
`;

