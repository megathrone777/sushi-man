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
  headers: {
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjQxMzI5NjI5LCJleHAiOjE2NDM5MjE2Mjl9.oebWp8uDoPzNYd_hi1ZdHUvbbgubtDdWvERBaNpXgkg`,
  },
  credentials: 'include',
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
  defaultOptions,
});

export default client;
