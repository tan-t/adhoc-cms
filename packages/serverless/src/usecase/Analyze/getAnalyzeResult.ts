import { DynamoDBUtils, Schema } from "../../infrastructure/persist/dynamodb";

export const getAnalyzeResult = async (id: string) => {
  return await DynamoDBUtils.getById(Schema.BLOG, id);
};
