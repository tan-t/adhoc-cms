import { getAnalyzeResult } from "../../../../usecase/Analyze/getAnalyzeResult";
import { QueryResolvers } from "../resolvers";

export const getBlog: QueryResolvers["getBlog"] = async (_, args) => {
  const res = await getAnalyzeResult(args.id);
  if (!res) {
    throw "見つかりませんでした。";
  }
  return res as any;
};
