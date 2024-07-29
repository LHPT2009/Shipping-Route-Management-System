"use client";

import { Provider } from "react-redux";
import { store } from "../lib/store/index";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/client/apollo-client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </Provider>
  );
}
