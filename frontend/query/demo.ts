import { gql } from "@apollo/client";
import createApolloClient from "@/lib/client/apollo-client";

export const fetchRoutes = async () => {
  const client = createApolloClient();
  const { data, error, loading } = await client.query({
    query: gql`
      query {
        getRoutes {
          id
          name
          user_id
        }
      }
    `,
  });
  return data.getRoutes;
};
