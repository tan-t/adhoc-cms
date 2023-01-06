import fetch from "node-fetch";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async ({ query: { baseHref } }, res) => {
  const response = await fetch(baseHref as string);
  res.setHeader("Content-Type", response.headers.get("Content-Type"));
  const html = await response.text();
  res.send(
    html.replace(/\"\//g, `"${baseHref}/`).replace(/\.\//g, `${baseHref}/`)
  );
};
export default handler;
