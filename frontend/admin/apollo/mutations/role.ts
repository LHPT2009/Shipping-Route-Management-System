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