import { gql } from "@apollo/client";

export const CREATE_ROUTE = gql`
  mutation createRoute($input: CreateRoutesDto!){
    createRoute(input: $input){
        status
        message
        data
        error
    }
  }
`;
