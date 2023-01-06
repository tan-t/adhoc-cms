// Requiring @types/serverless in your project package.json
import type { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
  service: "adhoc-serverless",
  plugins: [
    "serverless-esbuild",
    "serverless-dynamodb-local",
    "serverless-offline",
  ],
  custom: {
    esbuild: {
      plugins: "esbuild-plugins.js",
    },
    "serverless-offline": {
      httpPort: "3003",
    },
    dynamodb: {
      stages: ["local"],
      start: {
        port: 8000,
        inMemory: true,
        migrate: true,
      },
    },
  },
  provider: {
    name: "aws",
    region: "ap-northeast-1",
    runtime: "nodejs14.x",
  },
  functions: {
    graphql: {
      handler: "src/handler.graphql",
      events: [
        {
          httpApi: {
            method: "ANY",
            path: "/graphql",
          },
        },
      ],
    },
  },
  resources: {
    Resources: {
      ApplicationTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: `application_local`,
          AttributeDefinitions: [
            {
              AttributeName: "partition_key",
              AttributeType: "S",
            },
            {
              AttributeName: "sort_key",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "partition_key",
              KeyType: "HASH",
            },
            {
              AttributeName: "sort_key",
              KeyType: "RANGE",
            },
          ],
          BillingMode: "PAY_PER_REQUEST",
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
