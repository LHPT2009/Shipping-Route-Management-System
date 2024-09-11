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

export const UPDATE_ROUTE = gql`
  mutation updateRoute($input: UpdateRoutesDto!, $id: ID!){
    updateRoute(input: $input, id: $id){
        status
        message
        data
        error
    }
  }
`;

export const REMOVE_ROUTE = gql`
  mutation removeRoute($id: ID!){
    removeRoute(id: $id){
        status
        message
        data
        error
    }
  }
`;


