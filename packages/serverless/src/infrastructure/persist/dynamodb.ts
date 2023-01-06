import { Environment } from "../environment";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

export const Schema = {
  BLOG: "blog",
  TEMPLATE: "template",
} as const;

type Schema_ = typeof Schema[keyof typeof Schema];

const getTableName = () => `application_${Environment.env()}`;

const getDocClient = () => {
  return new DocumentClient({
    endpoint: "http://localhost:8000",
  });
};

const getById = async (schema: Schema_, id: string) => {
  const { Item } = await getDocClient()
    .get({
      TableName: getTableName(),
      Key: {
        partition_key: schema,
        sort_key: id,
      },
    })
    .promise();
  return Item;
};

const putItem = async (item: any) => {
  await getDocClient()
    .put({
      TableName: getTableName(),
      Item: item,
    })
    .promise();
};

export const DynamoDBUtils = {
  getById,
  putItem,
};
