const fs = require("fs");
const jsdomPatch = {
  name: "jsdom-patch",
  setup(build) {
    build.onLoad(
      { filter: /jsdom\/living\/xhr\/XMLHttpRequest\-impl\.js$/ },
      async (args) => {
        let contents = await fs.promises.readFile(args.path, "utf8");
        contents = contents.replace(
          'const syncWorkerFile = require.resolve ? require.resolve("./xhr-sync-worker.js") : null;',
          `const syncWorkerFile = "${require.resolve(
            "jsdom/lib/jsdom/living/xhr/xhr-sync-worker.js"
          )}";`
        );

        return { contents, loader: "js" };
      }
    );
  },
};
const ignorePlugin = require("esbuild-plugin-ignore");
const p = ignorePlugin([
  {
    resourceRegExp: /canvas/,
    contextRegExp: /jsdom$/,
  },
]);

// default export should be an array of plugins
module.exports = [p, jsdomPatch];
