import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./index.ts"],
  splitting: false,
  sourcemap: true,
  dts: true,
  format: ["esm", "cjs"],
  clean: true,
});
