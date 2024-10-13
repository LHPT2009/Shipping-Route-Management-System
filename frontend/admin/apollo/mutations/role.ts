import { gql } from "@apollo/client";

export const ADD_PERMISSION_TO_ROLE = gql`
mutation ($input: PermissionToRoleDto!) {
  addPermissionToRole(input: $input) {
      status
      message
      data
      error
  }
}
`;

export const ADD_ROLE = gql`
mutation ($input: CreateRoleDto!) {
  createRole(input: $input) {
      status
      message
      data
      error
  }
}
`;

export const UPDATE_ROLE = gql`
mutation ($id:ID!,$input: UpdateRoleDto!) {
  updateRole(id: $id,input: $input) {
      status
      message
      data
      error
  }
}
`;

export const DELETE_ROLE = gql`
mutation ($id: ID!) {
  removeRole(id: $id) {
     status
      message
      data
    	error
  }
}
`;

export const CREATE_MUTIPLE_ROLES = gql`
mutation createMutipleRoles($input: CreateMutipleRoleDto!){
  createMutipleRoles(input: $input){
      status
      message
      data
      error
  }
}
`;