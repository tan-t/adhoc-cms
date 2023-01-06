import { DynamoDBUtils, Schema } from "../../infrastructure/persist/dynamodb";
import { Diff } from "../DOM/Article";
import { DOMTree } from "../DOM/DOMTree";

export class ArticleTemplate {
  static fromDOM(articleDOM: Element, diffs: Diff[], id: string) {
    diffs.forEach((d) => {
      const element = d.path.visit(articleDOM);
      if (!element) {
        return;
      }
      if (d.path.attribute) {
        element.setAttribute(
          d.path.attribute,
          `{{{ ${d.path.toString().replace(".", "_")} }}}`
        );
        return;
      }
      element.textContent = `{{{ ${d.path.toString()} }}}`;
    });
    return new ArticleTemplate(articleDOM.outerHTML, id);
  }

  constructor(public template: string, public id: string) {}
}

export class Template {
  constructor(
    public main: string,
    public articles: ArticleTemplate[],
    public id: string,
    public original: string
  ) {}

  static fromDOM(dom: Document, original: string, id: string, uses?: string[]) {
    const body = new DOMTree(dom.body);
    const sections = body.analyzeSections();
    const articles = new Array<ArticleTemplate>();
    sections.forEach((elem) => {
      if (!uses?.includes(elem.sectionId)) {
        return;
      }
      const articleContainer = elem.path.visit(dom.body);
      if (!articleContainer) {
        return;
      }
      if (articleContainer.lastElementChild) {
        articles.push(
          ArticleTemplate.fromDOM(
            articleContainer.lastElementChild,
            elem.getDiffs(),
            elem.sectionId
          )
        );
      }
      while (articleContainer.lastElementChild) {
        articleContainer.removeChild(articleContainer.lastElementChild);
      }
      articleContainer.textContent = `[adhoc-cms-anchor-sectionId=${elem.sectionId}]`;
    });
    return new Template(dom.documentElement.outerHTML, articles, id, original);
  }

  public async persist() {
    await DynamoDBUtils.putItem({
      partition_key: Schema.TEMPLATE,
      sort_key: this.id,
      main: this.main,
      original: this.original,
      parts: this.articles.map((a) => ({ id: a.id, template: a.template })),
      id: this.id,
    });
  }
}
