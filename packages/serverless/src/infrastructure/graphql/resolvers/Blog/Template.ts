import { DynamoDBUtils, Schema } from "../../../persist/dynamodb";
import { Blog, Maybe, ResolverFn, Template } from "../resolvers";

export const BlogTemplateResolver: ResolverFn<
  Maybe<Template>,
  Blog,
  any,
  any
> = async (parent) => {
  const res = await DynamoDBUtils.getById(Schema.TEMPLATE, parent.id);
  if (!res) {
    return null;
  }

  return {
    id: res["id"],
    main: res["main"],
    original: res["original"],
    parts: res["parts"],
  };
};
