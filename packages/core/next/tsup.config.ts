import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./index.ts"],
  splitting: false,
  sourcemap: true,
  dts: true,
  format: ["esm", "cjs"],
  clean: true,
  // Never bundle native/peer libs. Bundling one (e.g. react-native-gesture-handler)
  // duplicates its native view registration and crashes the host app with
  // "Tried to register two views with the same name".
  external: [
    "react",
    "react-native",
    /^react-native-/,
    /^@react-native/,
    /^@react-navigation/,
    /^expo/,
    "@expo/vector-icons",
  ],
});
