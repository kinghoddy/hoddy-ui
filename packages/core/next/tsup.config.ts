import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./index.ts"],
  splitting: false,
  sourcemap: true,
  dts: true,
  format: ["esm", "cjs"],
  // external: ["expo-linking", "expo-router", "react-native", "expo-system-ui"],
  clean: true,
});
