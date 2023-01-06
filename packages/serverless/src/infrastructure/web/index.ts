import fetch from "node-fetch";
import { JSDOM } from "jsdom";

export const getDOM = async (url: string) => {
  const htmlText = await fetch(url).then((res) => res.text());
  return {
    document: new JSDOM(htmlText).window.document,
    htmlText,
    getClone: () => new JSDOM(htmlText).window.document,
  };
};
