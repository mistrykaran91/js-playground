import * as esbuild from "esbuild-wasm";
const UNPKG_URL = "https://unpkg.com";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: "index.js", namespace: "js-p" };
      });

      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: "js-p",
          path: new URL(args.path, `${UNPKG_URL}${args.resolveDir}/`).href,
        };
      });

      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: "js-p",
          path: `${UNPKG_URL}/${args.path}`,
        };
      });
    },
  };
};
