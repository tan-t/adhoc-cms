import graphql_ from "./infrastructure/graphql";

export const test = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};

export const graphql = graphql_;
