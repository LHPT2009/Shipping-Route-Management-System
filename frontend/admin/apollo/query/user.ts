import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers($input: FilterUsersDto!) {
    getUsers(input: $input) {
        status
        message
        data
        error
    }
  }
`;

