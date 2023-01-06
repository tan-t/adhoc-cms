import { gql } from "apollo-server-lambda";

export const typeDefs = gql`
  type Query {
    getBlog(id: String!): Blog
  }
  type Mutation {
    analyzeByUrl(url: String!): AnalyzeResult
    updateBlog(input: BlogInput!): Blog
  }
  type ArticleDef {
    title: String!
  }

  type Blog {
    id: String!
    url: String!
    title: String!
    sections: [BlogSection!]!
    template: Template
    errors: [String]
  }

  input BlogInput {
    id: String!
    url: String
    title: String
    sections: [BlogSectionInput]
  }

  type AnalyzeResult {
    id: String!
    url: String
    title: String!
    sections: [AnalyzedSection!]!
    errors: [String]
  }

  type BlogSection {
    title: String!
    fieldDefs: [FieldDef!]!
    articles: [Article!]!
    location: String!
    use: Boolean
  }
  input BlogSectionInput {
    title: String!
    fieldDefs: [FieldDefInput!]!
    articles: [ArticleInput!]!
    location: String!
    use: Boolean
  }
  type AnalyzedSection {
    title: String!
    fieldDefs: [FieldDef!]!
    articles: [Article!]!
    location: String!
  }
  type FieldDef {
    id: ID!
    order: Int!
    label: String!
    type: FieldType!
    location: String!
  }
  input FieldDefInput {
    id: ID!
    order: Int!
    label: String!
    type: FieldType!
    location: String!
  }
  input ArticleInput {
    id: ID!
    contents: [ValueInput!]!
    location: String!
  }
  input ValueInput {
    fieldId: ID!
    value: String
  }
  enum FieldType {
    TEXT
    IMAGE
  }
  type Article {
    id: ID!
    contents: [Value!]!
    location: String!
  }
  type Value {
    fieldId: ID!
    field: FieldDef
    value: String
  }

  type Template {
    id: ID!
    main: String!
    parts: [TemplatePart!]!
    original: String!
  }
  type TemplatePart {
    id: ID!
    template: String!
  }
`;
