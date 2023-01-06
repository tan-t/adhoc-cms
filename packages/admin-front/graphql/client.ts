import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
const memo = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:3003/graphql",
  }),
});

export const getGqlClient = () => {
  return memo;
};
