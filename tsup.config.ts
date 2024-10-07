import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.tsx"],
  treeshake: true,
  sourcemap: "inline",
  minify: true,
  clean: true,
  dts: {
    compilerOptions: {
      jsx: "react",
      jsxFactory: "React.createElement",
    },
  },
  splitting: false,
  format: ["cjs", "esm"],
  external: ["react"],
  injectStyle: true,
  esbuildOptions(options) {
    options.jsx = "transform";
  },
});
