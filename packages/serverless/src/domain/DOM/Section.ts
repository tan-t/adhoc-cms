import { Article, Diff, NodePath } from "./Article";

export class Section {
  constructor(
    public path: NodePath,
    public sectionId: string,
    public articles: Article[],
    public title: string
  ) {}

  public getDiffs(): Diff[] {
    const pairwised = this.articles.reduce(
      (prev, elem) => [
        ...prev,
        ...this.articles
          .filter((a) => a.id !== elem.id)
          .map((a): [Article, Article] => [a, elem]),
      ],
      new Array<[Article, Article]>()
    );

    return pairwised.reduce(
      (prev, [a, b]) => Diff.from(a, b, prev),
      new Array<Diff>()
    );
  }
}
