import { gql } from "@apollo/client";

export const CREATE_CONTACT = gql`
  mutation createContact($input: CreateContactDto!) {
    createContact(input: $input) {
        status
        message
        data
        error
    }
  }
`;