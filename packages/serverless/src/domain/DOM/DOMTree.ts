import { v4 } from "uuid";
import { Article, NodePath } from "./Article";
import { Section } from "./Section";

export class DOMTree {
  constructor(public element: HTMLElement) {}

  public analyzeSections() {
    const findRecurrence = (
      element: HTMLElement,
      found: Section[],
      path: NodePath
    ): Section[] => {
      const children = [...(element.children as any)];
      const isTwoSimilar = (a: HTMLElement, b: HTMLElement) =>
        [...(a.classList as any).values()].some((c) => b.classList.contains(c));
      if (children.length === 0) {
        return found;
      }
      if (children.length === 1) {
        return findRecurrence(children[0], found, path.join("0"));
      }
      if (
        children.every((elem) => children.every((c) => isTwoSimilar(elem, c)))
      ) {
        return [
          ...found,
          new Section(
            path,
            path.path,
            children.map((c, i) => new Article(v4(), c, path.join(String(i)))),
            "Untitled Section"
          ),
        ];
      }
      return children.reduce(
        (prev, elem, inx) => findRecurrence(elem, prev, path.join(String(inx))),
        found
      );
    };

    return findRecurrence(this.element, [], NodePath.root());
  }
}
