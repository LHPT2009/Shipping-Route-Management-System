import { ApolloError } from "@apollo/client";

export const getErrorMessage = (error: ApolloError) => {
  if (error.graphQLErrors?.length > 0) {
    return error.graphQLErrors[0].extensions?.originalError;
  }
};