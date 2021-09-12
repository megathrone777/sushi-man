import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://sushi-admin.herokuapp.com/graphql",
  cache: new InMemoryCache(),
  ssrMode: true
});

export default client;
