import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
  query getLocations {
    getLocations {
        status
        message
        data
        error
    }
  }
`;

