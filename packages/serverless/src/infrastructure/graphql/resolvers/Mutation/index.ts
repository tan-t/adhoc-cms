import { MutationResolvers } from "../resolvers";
import { analyzeByUrl } from "./analyzeByUrl";
import { updateBlog } from "./updateBlog";

export const Mutation: MutationResolvers = {
  analyzeByUrl,
  updateBlog,
};
