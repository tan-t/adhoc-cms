import { Blog } from "../../domain/Contents/Blog";
import { DOMTree } from "../../domain/DOM/DOMTree";
import { Template } from "../../domain/Rendering/Template";
import { AnalyzeResult } from "../../infrastructure/graphql/resolvers/resolvers";
import { getDOM } from "../../infrastructure/web";

export const analyzeByUrl = async (url: string): Promise<AnalyzeResult> => {
  const {
    document: { body, head },
    htmlText,
    getClone,
  } = await getDOM(url);
  const domTree = new DOMTree(body);
  const sections = domTree.analyzeSections();
  const blog = Blog.fromDOM(
    head.querySelector("title")?.textContent || url,
    url,
    sections
  );
  await blog.persist();
  await Template.fromDOM(getClone(), htmlText, blog.id).persist();
  return blog.toGqlAnalyzeResult();
};
