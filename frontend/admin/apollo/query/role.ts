import { gql } from "@apollo/client";

export const GET_ROLES = gql`
 query {
   getRoles{
    status
    message
    data
    error
  }
}
`;

export const GET_ROLE = gql`
query ($id: ID!) {
  getRole(id: $id) {
      status
      message
      data
      error
  }
}
`;
