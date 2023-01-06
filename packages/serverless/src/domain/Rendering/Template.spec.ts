import { JSDOM } from "jsdom";
import { Template } from "./Template";

describe("Template", () => {
  it("clears article container", () => {
    const html = `
<html>
<head>
<title>this is title</title>
</head>
<body>
<div class="article_container_1">
<div class="article_1">
<img src="test"/>
<span>hi! I am an article 1!</span>
</div>
<div class="article_1">
<img src="test2"/>
<span>hi! I am an article 2!</span>
</div>
</div>
<div class="not_an_article_container">
<span>i am not an article</span>
</div>
<div class="article_container_2">
<div class="article_2">
<img src="test"/>
<span>hi! I am an article 1!</span>
</div>
<div class="article_2">
<img src="test2"/>
<span>hi! I am an article 2!</span>
</div>
</div>
</body>
</html>
`;
    const template = Template.fromDOM(
      new JSDOM(html).window.document,
      html,
      "_",
      ["ROOT/0"]
    );
    //     expect(template.html).toBe("_");
    expect(template.articles[0]?.template).toBe("_");
  });
});
