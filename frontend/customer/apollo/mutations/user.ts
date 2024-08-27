import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
  mutation updateUserByToken($input: UserUpdateDto!) {
    updateUserByToken(input: $input) {
        status
        message
        data
        error
    }
  }
`;