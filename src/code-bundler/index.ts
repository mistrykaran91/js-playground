import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./unpkg-path-plugin";
import { fetchPlugin } from "./fetch-plugin";

const UNPKG_URL = "https://unpkg.com";

let intialized = false;

export const startService = async () => {
  await esbuild
    .initialize({
      worker: true,
      wasmURL: `${UNPKG_URL}/esbuild-wasm@0.17.12/esbuild.wasm`,
    })
    .then((r) => (intialized = true));
};

const bundle = async (rawCode: string) => {
  try {
    if (!intialized) {
      await startService();
    }
    debugger;
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
    });
    debugger;
    return {
      code: result.outputFiles[0].text,
      err: "",
    };
  } catch (err: any) {
    return {
      code: "",
      err: err.message,
    };
  }
};

export default bundle;
