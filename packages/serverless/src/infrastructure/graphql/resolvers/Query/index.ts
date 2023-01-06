import { QueryResolvers } from "../resolvers";
import { getBlog } from "./getBlog";

export const Query: QueryResolvers = {
  getBlog,
};
