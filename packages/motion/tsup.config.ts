import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "presets/index": "src/presets/index.ts",
    "components/index": "src/components/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  minify: true,
  external: ["motion", "motion/react", "react", "react-dom"],
  splitting: false,
});
