import { gql } from "@apollo/client";

export const UPDATE_ROLE_FOR_USER = gql`
mutation ($id:ID! ,$input: UserUpdateRoleDto!){
  updateRoleForUser (id:$id ,input: $input){
      status
      message
      data
      error
  }
}
`;

export const DELETE_USER = gql`
mutation ($id:ID!){
	removeUser (id:$id){
      status
      message
      data
      error
  }
}
`;

export const UPDATE_STATUS_USER = gql`
mutation ($id:ID! ,$input: UpdateStatusUserDto!){
  updateStatusUser (id:$id ,input: $input){
      status
      message
      data
      error
  }
}
`;