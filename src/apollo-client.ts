import { ApolloClient, InMemoryCache, DefaultOptions } from "@apollo/client";

const defaultOptions: DefaultOptions = {
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
};

const client = new ApolloClient({
  uri: "https://sushi-admin.herokuapp.com/graphql",
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
  defaultOptions,
});

export default client;
