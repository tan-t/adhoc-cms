import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AnalyzeResult = {
  __typename?: 'AnalyzeResult';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  sections: Array<AnalyzedSection>;
  title: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type AnalyzedSection = {
  __typename?: 'AnalyzedSection';
  articles: Array<Article>;
  fieldDefs: Array<FieldDef>;
  location: Scalars['String'];
  title: Scalars['String'];
};

export type Article = {
  __typename?: 'Article';
  contents: Array<Value>;
  id: Scalars['ID'];
  location: Scalars['String'];
};

export type ArticleDef = {
  __typename?: 'ArticleDef';
  title: Scalars['String'];
};

export type ArticleInput = {
  contents: Array<ValueInput>;
  id: Scalars['ID'];
  location: Scalars['String'];
};

export type Blog = {
  __typename?: 'Blog';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  sections: Array<BlogSection>;
  template?: Maybe<Template>;
  title: Scalars['String'];
  url: Scalars['String'];
};

export type BlogInput = {
  id: Scalars['String'];
  sections?: InputMaybe<Array<InputMaybe<BlogSectionInput>>>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type BlogSection = {
  __typename?: 'BlogSection';
  articles: Array<Article>;
  fieldDefs: Array<FieldDef>;
  location: Scalars['String'];
  title: Scalars['String'];
  use?: Maybe<Scalars['Boolean']>;
};

export type BlogSectionInput = {
  articles: Array<ArticleInput>;
  fieldDefs: Array<FieldDefInput>;
  location: Scalars['String'];
  title: Scalars['String'];
  use?: InputMaybe<Scalars['Boolean']>;
};

export type FieldDef = {
  __typename?: 'FieldDef';
  id: Scalars['ID'];
  label: Scalars['String'];
  location: Scalars['String'];
  order: Scalars['Int'];
  type: FieldType;
};

export type FieldDefInput = {
  id: Scalars['ID'];
  label: Scalars['String'];
  location: Scalars['String'];
  order: Scalars['Int'];
  type: FieldType;
};

export enum FieldType {
  Image = 'IMAGE',
  Text = 'TEXT'
}

export type Mutation = {
  __typename?: 'Mutation';
  analyzeByUrl?: Maybe<AnalyzeResult>;
  updateBlog?: Maybe<Blog>;
};


export type MutationAnalyzeByUrlArgs = {
  url: Scalars['String'];
};


export type MutationUpdateBlogArgs = {
  input: BlogInput;
};

export type Query = {
  __typename?: 'Query';
  getBlog?: Maybe<Blog>;
};


export type QueryGetBlogArgs = {
  id: Scalars['String'];
};

export type Template = {
  __typename?: 'Template';
  id: Scalars['ID'];
  main: Scalars['String'];
  original: Scalars['String'];
  parts: Array<TemplatePart>;
};

export type TemplatePart = {
  __typename?: 'TemplatePart';
  id: Scalars['ID'];
  template: Scalars['String'];
};

export type Value = {
  __typename?: 'Value';
  field?: Maybe<FieldDef>;
  fieldId: Scalars['ID'];
  value?: Maybe<Scalars['String']>;
};

export type ValueInput = {
  fieldId: Scalars['ID'];
  value?: InputMaybe<Scalars['String']>;
};

export type BlogTypeFragment = { __typename?: 'Blog', title: string, id: string, url: string, template?: { __typename?: 'Template', id: string, main: string, original: string, parts: Array<{ __typename?: 'TemplatePart', id: string, template: string }> } | null | undefined, sections: Array<{ __typename?: 'BlogSection', location: string, title: string, use?: boolean | null | undefined, fieldDefs: Array<{ __typename?: 'FieldDef', id: string, label: string, location: string, order: number, type: FieldType }>, articles: Array<{ __typename?: 'Article', id: string, location: string, contents: Array<{ __typename?: 'Value', fieldId: string, value?: string | null | undefined }> }> }> };

export type TemplateTypeFragment = { __typename?: 'Template', id: string, main: string, original: string, parts: Array<{ __typename?: 'TemplatePart', id: string, template: string }> };

export type AnalyzeByUrlMutationVariables = Exact<{
  url: Scalars['String'];
}>;


export type AnalyzeByUrlMutation = { __typename?: 'Mutation', analyzeByUrl?: { __typename?: 'AnalyzeResult', id: string } | null | undefined };

export type GetBlogQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetBlogQuery = { __typename?: 'Query', getBlog?: { __typename?: 'Blog', title: string, id: string, url: string, template?: { __typename?: 'Template', id: string, main: string, original: string, parts: Array<{ __typename?: 'TemplatePart', id: string, template: string }> } | null | undefined, sections: Array<{ __typename?: 'BlogSection', location: string, title: string, use?: boolean | null | undefined, fieldDefs: Array<{ __typename?: 'FieldDef', id: string, label: string, location: string, order: number, type: FieldType }>, articles: Array<{ __typename?: 'Article', id: string, location: string, contents: Array<{ __typename?: 'Value', fieldId: string, value?: string | null | undefined }> }> }> } | null | undefined };

export type UpdateBlogMutationVariables = Exact<{
  input: BlogInput;
}>;


export type UpdateBlogMutation = { __typename?: 'Mutation', updateBlog?: { __typename?: 'Blog', title: string, id: string, url: string, template?: { __typename?: 'Template', id: string, main: string, original: string, parts: Array<{ __typename?: 'TemplatePart', id: string, template: string }> } | null | undefined, sections: Array<{ __typename?: 'BlogSection', location: string, title: string, use?: boolean | null | undefined, fieldDefs: Array<{ __typename?: 'FieldDef', id: string, label: string, location: string, order: number, type: FieldType }>, articles: Array<{ __typename?: 'Article', id: string, location: string, contents: Array<{ __typename?: 'Value', fieldId: string, value?: string | null | undefined }> }> }> } | null | undefined };

export const TemplateTypeFragmentDoc = gql`
    fragment TemplateType on Template {
  id
  main
  original
  parts {
    id
    template
  }
}
    `;
export const BlogTypeFragmentDoc = gql`
    fragment BlogType on Blog {
  title
  id
  url
  template {
    ...TemplateType
  }
  sections {
    location
    title
    use
    fieldDefs {
      id
      label
      location
      order
      type
    }
    articles {
      id
      location
      contents {
        fieldId
        value
      }
    }
  }
}
    ${TemplateTypeFragmentDoc}`;
export const AnalyzeByUrlDocument = gql`
    mutation analyzeByUrl($url: String!) {
  analyzeByUrl(url: $url) {
    id
  }
}
    `;
export type AnalyzeByUrlMutationFn = Apollo.MutationFunction<AnalyzeByUrlMutation, AnalyzeByUrlMutationVariables>;

/**
 * __useAnalyzeByUrlMutation__
 *
 * To run a mutation, you first call `useAnalyzeByUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAnalyzeByUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [analyzeByUrlMutation, { data, loading, error }] = useAnalyzeByUrlMutation({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useAnalyzeByUrlMutation(baseOptions?: Apollo.MutationHookOptions<AnalyzeByUrlMutation, AnalyzeByUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AnalyzeByUrlMutation, AnalyzeByUrlMutationVariables>(AnalyzeByUrlDocument, options);
      }
export type AnalyzeByUrlMutationHookResult = ReturnType<typeof useAnalyzeByUrlMutation>;
export type AnalyzeByUrlMutationResult = Apollo.MutationResult<AnalyzeByUrlMutation>;
export type AnalyzeByUrlMutationOptions = Apollo.BaseMutationOptions<AnalyzeByUrlMutation, AnalyzeByUrlMutationVariables>;
export const GetBlogDocument = gql`
    query getBlog($id: String!) {
  getBlog(id: $id) {
    ...BlogType
  }
}
    ${BlogTypeFragmentDoc}`;

/**
 * __useGetBlogQuery__
 *
 * To run a query within a React component, call `useGetBlogQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlogQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBlogQuery(baseOptions: Apollo.QueryHookOptions<GetBlogQuery, GetBlogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBlogQuery, GetBlogQueryVariables>(GetBlogDocument, options);
      }
export function useGetBlogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlogQuery, GetBlogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBlogQuery, GetBlogQueryVariables>(GetBlogDocument, options);
        }
export type GetBlogQueryHookResult = ReturnType<typeof useGetBlogQuery>;
export type GetBlogLazyQueryHookResult = ReturnType<typeof useGetBlogLazyQuery>;
export type GetBlogQueryResult = Apollo.QueryResult<GetBlogQuery, GetBlogQueryVariables>;
export const UpdateBlogDocument = gql`
    mutation updateBlog($input: BlogInput!) {
  updateBlog(input: $input) {
    ...BlogType
  }
}
    ${BlogTypeFragmentDoc}`;
export type UpdateBlogMutationFn = Apollo.MutationFunction<UpdateBlogMutation, UpdateBlogMutationVariables>;

/**
 * __useUpdateBlogMutation__
 *
 * To run a mutation, you first call `useUpdateBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBlogMutation, { data, loading, error }] = useUpdateBlogMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBlogMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBlogMutation, UpdateBlogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBlogMutation, UpdateBlogMutationVariables>(UpdateBlogDocument, options);
      }
export type UpdateBlogMutationHookResult = ReturnType<typeof useUpdateBlogMutation>;
export type UpdateBlogMutationResult = Apollo.MutationResult<UpdateBlogMutation>;
export type UpdateBlogMutationOptions = Apollo.BaseMutationOptions<UpdateBlogMutation, UpdateBlogMutationVariables>;