import { ApolloServer } from "apollo-server-lambda";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // mockEntireSchema: true,
});

export default server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
} as any);
