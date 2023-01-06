import { MutationResolvers } from "../resolvers";
import { analyzeByUrl as usecase } from "../../../../usecase/Analyze/analyzeByUrl";

export const analyzeByUrl: MutationResolvers["analyzeByUrl"] = async (
  _,
  args
) => {
  return await usecase(args.url);
};
