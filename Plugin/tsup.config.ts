import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./index.tsx"],
  treeshake: true,
  sourcemap: "inline",
  minify: true,
  clean: true,
  dts: true,
  splitting: false,
  format: ["cjs", "esm"],
  external: ["react"],
  injectStyle: true,
});
