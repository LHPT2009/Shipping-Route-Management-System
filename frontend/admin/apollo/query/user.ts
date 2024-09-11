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

export const GET_USER_BY_ID = gql`
  query getUserById($id: ID!){
    getUserById (id: $id){
        status
        message
        data
        error
    }
  }
`;
