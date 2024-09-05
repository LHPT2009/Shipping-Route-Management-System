import { gql } from "@apollo/client";

export const ADD_PERMISSION = gql`
mutation ($input: CreatePermissionDto!) {
  createPermission(input: $input) {
      status
      message
      data
      error
  }
}
`;

export const UPDATE_PERMISSION = gql`
mutation ($id:ID!,$input: UpdatePermissionDto!) {
  updatePermission(id: $id,input: $input) {
      status
      message
      data
      error
  }
}
`;

export const DELETE_PERMISSION = gql`
mutation ($id: ID!) {
  removePermission(id: $id) {
     status
      message
      data
    	error
  }
}
`;