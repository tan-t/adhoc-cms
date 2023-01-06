import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  id: Scalars['ID'];
  label: Scalars['String'];
  location: Scalars['String'];
  order: Scalars['Int'];
  type: FieldType;
};

export type Blog = {
  __typename?: 'Blog';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  sections: Array<AnalyzedSection>;
  template?: Maybe<Template>;
  title: Scalars['String'];
  url?: Maybe<Scalars['String']>;
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AnalyzeResult: ResolverTypeWrapper<AnalyzeResult>;
  AnalyzedSection: ResolverTypeWrapper<AnalyzedSection>;
  Article: ResolverTypeWrapper<Article>;
  ArticleDef: ResolverTypeWrapper<ArticleDef>;
  ArticleInput: ArticleInput;
  Blog: ResolverTypeWrapper<Blog>;
  BlogInput: BlogInput;
  BlogSection: ResolverTypeWrapper<BlogSection>;
  BlogSectionInput: BlogSectionInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  FieldDef: ResolverTypeWrapper<FieldDef>;
  FieldDefInput: FieldDefInput;
  FieldType: FieldType;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Template: ResolverTypeWrapper<Template>;
  TemplatePart: ResolverTypeWrapper<TemplatePart>;
  Value: ResolverTypeWrapper<Value>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AnalyzeResult: AnalyzeResult;
  AnalyzedSection: AnalyzedSection;
  Article: Article;
  ArticleDef: ArticleDef;
  ArticleInput: ArticleInput;
  Blog: Blog;
  BlogInput: BlogInput;
  BlogSection: BlogSection;
  BlogSectionInput: BlogSectionInput;
  Boolean: Scalars['Boolean'];
  FieldDef: FieldDef;
  FieldDefInput: FieldDefInput;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Template: Template;
  TemplatePart: TemplatePart;
  Value: Value;
};

export type AnalyzeResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnalyzeResult'] = ResolversParentTypes['AnalyzeResult']> = {
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sections?: Resolver<Array<ResolversTypes['AnalyzedSection']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnalyzedSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnalyzedSection'] = ResolversParentTypes['AnalyzedSection']> = {
  articles?: Resolver<Array<ResolversTypes['Article']>, ParentType, ContextType>;
  fieldDefs?: Resolver<Array<ResolversTypes['FieldDef']>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Article'] = ResolversParentTypes['Article']> = {
  contents?: Resolver<Array<ResolversTypes['Value']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleDefResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArticleDef'] = ResolversParentTypes['ArticleDef']> = {
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlogResolvers<ContextType = any, ParentType extends ResolversParentTypes['Blog'] = ResolversParentTypes['Blog']> = {
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sections?: Resolver<Array<ResolversTypes['AnalyzedSection']>, ParentType, ContextType>;
  template?: Resolver<Maybe<ResolversTypes['Template']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlogSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlogSection'] = ResolversParentTypes['BlogSection']> = {
  articles?: Resolver<Array<ResolversTypes['Article']>, ParentType, ContextType>;
  fieldDefs?: Resolver<Array<ResolversTypes['FieldDef']>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  use?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FieldDefResolvers<ContextType = any, ParentType extends ResolversParentTypes['FieldDef'] = ResolversParentTypes['FieldDef']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['FieldType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  analyzeByUrl?: Resolver<Maybe<ResolversTypes['AnalyzeResult']>, ParentType, ContextType, RequireFields<MutationAnalyzeByUrlArgs, 'url'>>;
  updateBlog?: Resolver<Maybe<ResolversTypes['Blog']>, ParentType, ContextType, RequireFields<MutationUpdateBlogArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getBlog?: Resolver<Maybe<ResolversTypes['Blog']>, ParentType, ContextType, RequireFields<QueryGetBlogArgs, 'id'>>;
};

export type TemplateResolvers<ContextType = any, ParentType extends ResolversParentTypes['Template'] = ResolversParentTypes['Template']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  main?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  original?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parts?: Resolver<Array<ResolversTypes['TemplatePart']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TemplatePartResolvers<ContextType = any, ParentType extends ResolversParentTypes['TemplatePart'] = ResolversParentTypes['TemplatePart']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  template?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['Value'] = ResolversParentTypes['Value']> = {
  field?: Resolver<Maybe<ResolversTypes['FieldDef']>, ParentType, ContextType>;
  fieldId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AnalyzeResult?: AnalyzeResultResolvers<ContextType>;
  AnalyzedSection?: AnalyzedSectionResolvers<ContextType>;
  Article?: ArticleResolvers<ContextType>;
  ArticleDef?: ArticleDefResolvers<ContextType>;
  Blog?: BlogResolvers<ContextType>;
  BlogSection?: BlogSectionResolvers<ContextType>;
  FieldDef?: FieldDefResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Template?: TemplateResolvers<ContextType>;
  TemplatePart?: TemplatePartResolvers<ContextType>;
  Value?: ValueResolvers<ContextType>;
};

