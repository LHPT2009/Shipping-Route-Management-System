import { gql } from "@apollo/client";

export const GET_ROUTES = gql`
  query GetRoutes($input: FilterRoutesDto!) {
    getRoutes(input: $input) {
        status
        message
        data
        error
    }
  }
`;