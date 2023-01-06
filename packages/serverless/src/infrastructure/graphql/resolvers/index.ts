import { Resolvers } from "./resolvers";
import { Mutation } from "./Mutation";
import { Query } from "./Query";
import { BlogTemplateResolver } from "./Blog/Template";

export const resolvers: Resolvers = {
  Mutation,
  Query,
  Blog: {
    template: BlogTemplateResolver,
  },
};
