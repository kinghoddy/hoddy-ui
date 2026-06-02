import { ThemeTypes, extraColorTypes } from "../types";

let extraColors: extraColorTypes = {};

export const setExtraColors = (c: extraColorTypes) => (extraColors = c);

type Palette = {
  main?: string;
  light?: string;
  dark?: string;
  text?: string;
  [key: number]: string;
};

// Semantic palettes — used in BOTH light and dark modes unless overridden below.
const defaultPalettes: Record<string, Palette> = {
  primary: {
    main: "#ff8800",
    light: "#feffd3",
    dark: "#ffaa00",
    text: "#ffffff",
  },
  secondary: {
    main: "#ff1111",
    light: "#ff4433",
    dark: "#dd0000",
    text: "#ffffff",
  },
  light: {
    main: "#ffffff",
    light: "#ffffff",
    dark: "#dddddd",
    text: "#000000",
  },
  dark: {
    main: "#000000",
    light: "#777777",
    dark: "#111111",
    text: "#ffffff",
  },
  textSecondary: {
    main: "#aaaaaa",
    light: "#bbbbbb",
    dark: "#777777",
    text: "#ffffff",
  },
  blue: {
    main: "#0099ff",
    light: "#3399ff",
    dark: "#002288",
    text: "#ffffff",
  },
  info: {
    main: "#0099ff",
    light: "#33aaff",
    dark: "#0088aa",
    text: "#ffffff",
  },
  success: {
    main: "#00aa44",
    light: "#55cc33",
    dark: "#006622",
    text: "#ffffff",
  },
  warning: {
    main: "#ffaa22",
    light: "#ffcc77",
    dark: "#ff9900",
    text: "#ffffff",
  },
  error: {
    main: "#dd2222",
    light: "#ff4433",
    dark: "#aa2200",
    text: "#ffffff",
  },
};

// Neutrals invert with theme — `white[1]` is the primary surface, `black[1]` is the primary text.
const lightNeutrals: Record<string, Palette> = {
  white: { 1: "#ffffff", 2: "#f7f7f7", 3: "#eeeeee", 4: "#dddddd", 5: "#bbbbbb" },
  black: { 1: "#888888", 2: "#777777", 3: "#555555", 4: "#333333", 5: "#000000" },
};

const darkNeutrals: Record<string, Palette> = {
  white: { 1: "#060606", 2: "#222222", 3: "#333333", 4: "#444444", 5: "#555555" },
  black: { 1: "#ffffff", 2: "#f7f7f7", 3: "#eeeeee", 4: "#dddddd", 5: "#aaaaaa" },
};

// Only palettes whose semantics flip with the theme need dark overrides.
const darkPaletteOverrides: Record<string, Palette> = {
  dark: {
    main: "#f2f3f4",
    light: "#ffffff",
    dark: "#dddddd",
    text: "#000000",
  },
  light: {
    main: "#111111",
    light: "#555555",
    dark: "#333333",
    text: "#ffffff",
  },
  textSecondary: {
    main: "#666666",
    light: "#777777",
    dark: "#444444",
    text: "#ffffff",
  },
};

export default function colors(theme: ThemeTypes) {
  const isDark = theme === "dark";
  const neutrals = isDark ? darkNeutrals : lightNeutrals;
  const overrides: Record<string, Palette> = isDark ? darkPaletteOverrides : {};

  // Every palette key — defaults plus any custom keys consumers added via initialize().
  const baseDefaults: Record<string, Palette> = {
    ...neutrals,
    ...defaultPalettes,
  };
  const keys = new Set([
    ...Object.keys(baseDefaults),
    ...Object.keys(extraColors.light ?? {}),
    ...Object.keys(extraColors.dark ?? {}),
  ]);

  // Theme-inverting palettes: in dark mode they should NOT inherit light extras —
  // each mode's extras stand alone so a custom light surface doesn't bleed into dark.
  const themeInvertingKeys = new Set([
    "white",
    "black",
    "textSecondary",
    "dark",
    "light",
  ]);

  const result: Record<string, Palette> = {};
  keys.forEach((key) => {
    const skipLightExtras = isDark && themeInvertingKeys.has(key);
    result[key] = {
      ...baseDefaults[key],
      ...overrides[key],
      ...(skipLightExtras ? {} : extraColors.light?.[key]),
      ...(isDark ? extraColors.dark?.[key] : {}),
    };
  });

  return result as Record<string, Palette> & {
    white: Palette;
    black: Palette;
    primary: Palette;
    secondary: Palette;
    light: Palette;
    dark: Palette;
    textSecondary: Palette;
    blue: Palette;
    info: Palette;
    success: Palette;
    warning: Palette;
    error: Palette;
  };
}
