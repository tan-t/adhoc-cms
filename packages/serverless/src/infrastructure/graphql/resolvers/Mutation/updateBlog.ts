import { Template } from "../../../../domain/Rendering/Template";
import { DynamoDBUtils, Schema } from "../../../persist/dynamodb";
import { JSDOM } from "jsdom";
import { MutationResolvers } from "../resolvers";

export const updateBlog: MutationResolvers["updateBlog"] = async (_, args) => {
  const origin = await DynamoDBUtils.getById(Schema.BLOG, args.input.id);
  const templateOrigin = await DynamoDBUtils.getById(
    Schema.TEMPLATE,
    args.input.id
  );
  if (!origin || !templateOrigin) {
    throw "見つかりませんでした。";
  }

  const updated = {
    ...origin,
    ...args.input,
  };

  await DynamoDBUtils.putItem(updated);

  const html = templateOrigin["original"] as string;
  await Template.fromDOM(
    new JSDOM(html).window.document,
    html,
    args.input.id,
    args.input.sections
      ?.filter((s) => s?.use)
      .map((s) => s?.location)
      .filter((x): x is string => Boolean(x))
  ).persist();

  return updated as any;
};
