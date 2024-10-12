import { fetchCookies } from "@/utils/token/fetch_cookies.token";
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: "http://localhost:5000/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const { accessToken } = await fetchCookies();
  return {
    headers: {
      ...headers,
      ...(accessToken && { authorization: `Bearer ${accessToken}` }),
      clienttype: process.env.NEXT_PUBLIC_CLIENT_TYPE
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});