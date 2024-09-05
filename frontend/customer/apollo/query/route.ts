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

export const GET_ROUTE_BY_ID = gql`
  query getRoute($input: ID!) {
    getRoute(id: $input) {
        status
        message
        data
        error
    }
    }
`;

