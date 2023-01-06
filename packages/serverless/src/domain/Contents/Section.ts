import {
  AnalyzedSection,
  FieldDef,
  FieldType,
} from "../../infrastructure/graphql/resolvers/resolvers";
import { Article, Article as DOMArticle } from "./Article";
import { Section as DOMSection } from "../DOM/Section";
import { Diff, NodePath } from "../DOM/Article";

export class Section {
  constructor(
    public id: string,
    public location: string,
    public title: string,
    public fields: FieldDef[],
    public articles: DOMArticle[]
  ) {}

  public static fromDOM(origin: DOMSection) {
    const diffs = origin.getDiffs();
    return new Section(
      origin.sectionId,
      origin.path.toString(),
      origin.title,
      diffs.map((d, i) => ({
        ...Field.fromDiff(d, origin.path).toGqlFieldDef(),
        order: i,
      })),
      origin.articles.map((a) => Article.fromDOM(a, origin))
    );
  }

  toGqlSection(): AnalyzedSection {
    return {
      articles: this.articles.map((a) => a.toGqlArticle()),
      fieldDefs: this.fields,
      title: this.title,
      location: this.location,
    };
  }
}

export class Field {
  constructor(
    public id: string,
    public label: string,
    public type: FieldType,
    public location: NodePath
  ) {}

  public static fromDiff(diff: Diff, address: NodePath) {
    return new Field(
      address.join(diff.path).toString(),
      diff.path.toString(),
      diff.path.attribute === "src" ? FieldType.Image : FieldType.Text,
      address.join(diff.path)
    );
  }

  public toGqlFieldDef(): FieldDefWithoutOrder {
    return {
      id: this.id,
      label: this.label,
      type: this.type,
      location: this.location.toString(),
    };
  }
}

type FieldDefWithoutOrder = Omit<FieldDef, "order">;
