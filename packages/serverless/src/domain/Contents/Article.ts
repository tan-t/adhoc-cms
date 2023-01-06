import {
  Article as GqlArticle,
  Maybe,
  Value,
} from "../../infrastructure/graphql/resolvers/resolvers";
import { Article as DOMArticle, Diff, NodePath } from "../DOM/Article";
import { Section as DOMSection } from "../DOM/Section";
import { Field } from "./Section";

export class Article {
  static fromDOM(origin: DOMArticle, section: DOMSection) {
    const diffs = section.getDiffs();
    return new Article(
      origin.id,
      diffs.map((diff) => ArticleEntry.fromDiff(diff, section.path, origin.id)),
      origin.location
    );
  }

  toGqlArticle(): GqlArticle {
    return {
      id: this.id,
      contents: this.contents.map((e) => e.toGqlValue()),
      location: this.location.toString(),
    };
  }

  constructor(
    public id: string,
    public contents: ArticleEntry[],
    public location: NodePath
  ) {}
}

export class ArticleEntry {
  constructor(public field: Field, public value: Maybe<string> | undefined) {}

  static fromDiff(diff: Diff, address: NodePath, articleId: string) {
    return new ArticleEntry(
      Field.fromDiff(diff, address),
      diff.values.find((v) => v.articleId === articleId)?.value
    );
  }

  toGqlValue(): Value {
    return {
      fieldId: this.field.id,
      value: this.value,
    };
  }
}
