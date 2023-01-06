export class Article {
  constructor(
    public id: string,
    public dom: HTMLElement,
    public location: NodePath
  ) {}
  public getNodes() {
    const operate = (
      element: HTMLElement,
      operations: Node[],
      path: NodePath
    ): Node[] => {
      const self = [
        ...operations,
        ...element
          .getAttributeNames()
          .map(
            (attribute) =>
              new Node(
                path.joinAttribute(attribute),
                element.getAttribute(attribute),
                this.id
              )
          ),
      ];
      if (element.children.length > 0) {
        return [...(element.children as any)].reduce((prev, elem, inx) => {
          return operate(elem, prev, path.join(String(inx)));
        }, self);
      }
      return [...self, new Node(path, element.textContent, this.id)];
    };
    return operate(this.dom, [], NodePath.relativeRoot());
  }
}

export class NodePath {
  constructor(public path: string, public attribute?: string) {}

  equals(another: NodePath) {
    return this.path === another.path && this.attribute === another.attribute;
  }

  join(part: string, attribute?: string): NodePath;
  join(part: NodePath): NodePath;
  join(part: string | NodePath, attribute?: string) {
    if (typeof part === "string") {
      return new NodePath(this.path + "/" + part, attribute);
    }
    return new NodePath(
      this.path + "/" + part.path,
      this.attribute || part.attribute
    );
  }

  joinAttribute(attribute: string) {
    return new NodePath(this.path, attribute);
  }

  static ROOT = "ROOT";
  static RELATIVE_ROOT = "X";

  static root() {
    return new NodePath(NodePath.ROOT);
  }

  static relativeRoot() {
    return new NodePath(NodePath.RELATIVE_ROOT);
  }

  toString() {
    return [this.path, this.attribute].filter(Boolean).join(".");
  }

  visit(root: Element) {
    const paths = this.path.split("/");
    return paths
      .filter((x) => x !== NodePath.ROOT)
      .filter((x) => x !== NodePath.RELATIVE_ROOT)
      .filter(Boolean)
      .reduce((parent, elem): Element | undefined => {
        return parent?.children?.[parseInt(elem)];
      }, root as Element | undefined);
  }
}

export class Node {
  constructor(
    public path: NodePath,
    public value: string | null,
    public articleId: string
  ) {}
}

export class Diff {
  constructor(public path: NodePath, public values: Node[]) {}

  mergeWith(nodes: Node[]) {
    return new Diff(this.path, [
      ...this.values,
      ...nodes.filter(
        (node) => !this.values.some((v) => node.articleId === v.articleId)
      ),
    ]);
  }

  static from(a: Article, b: Article, origin?: Diff[]) {
    const nodesA = a.getNodes();
    const nodesB = b.getNodes();
    const reduceFunc = (prev: Diff[], elem: Node) => {
      const returnNewValue = (path: NodePath, differentNodes: Node[]) => {
        const existent = prev.findIndex((x) => x.path.equals(path));
        if (existent < 0) {
          return [...prev, new Diff(path, differentNodes)];
        }
        return [
          ...prev.slice(0, existent),
          prev[existent]?.mergeWith(differentNodes),
          ...prev.slice(existent + 1),
        ].filter((x): x is Diff => Boolean(x));
      };
      const counter = nodesB.find((x) => x.path.equals(elem.path));
      if (!counter) {
        return returnNewValue(elem.path, [
          elem,
          new Node(elem.path, null, b.id),
        ]);
      }
      if (counter.value === elem.value) {
        return prev;
      }
      return returnNewValue(elem.path, [elem, counter]);
    };
    return nodesB.reduce(
      reduceFunc,
      nodesA.reduce(reduceFunc, origin || new Array<Diff>())
    );
  }
}
