import { v4 } from "uuid";
import { AnalyzeResult } from "../../infrastructure/graphql/resolvers/resolvers";
import { DynamoDBUtils, Schema } from "../../infrastructure/persist/dynamodb";
import { Section as DOMSection } from "../DOM/Section";
import { Section } from "./Section";

export class Blog {
  constructor(
    public title: string,
    public sections: Section[],
    public url: string,
    id?: string
  ) {
    this.id = id || v4();
  }

  public id: string;

  static fromDOM(title: string, url: string, sections: DOMSection[]) {
    return new Blog(
      title,
      sections.map((s) => Section.fromDOM(s)),
      url
    );
  }

  public toGqlAnalyzeResult(): AnalyzeResult {
    return {
      id: this.id,
      title: this.title,
      sections: this.sections.map((s) => s.toGqlSection()),
      url: this.url,
    };
  }

  async persist() {
    const obj = this.toGqlAnalyzeResult();
    await DynamoDBUtils.putItem({
      partition_key: Schema.BLOG,
      sort_key: obj.id,
      ...obj,
    });
  }
}
