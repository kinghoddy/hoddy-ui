import { ThemeTypes, extraColorTypes } from "../types";

const lightColors = {
  white: {
    1: "#fff",
    2: "#f7f7f7",
    3: "#eee",
    4: "#ddd",
    5: "#bbb",
  },
  black: {
    1: "#888",
    2: "#777",
    3: "#555",
    4: "#333",
    5: "#000",
  },
};

let extraColors: extraColorTypes = {};

export const setExtraColors = (c: extraColorTypes) => (extraColors = c);

const darkColors = {
  black: {
    1: "#fff",
    2: "#f7f7f7",
    3: "#eee",
    4: "#ddd",
    5: "#aaa",
  },
  white: {
    1: "#000",
    2: "#222",
    3: "#444",
    4: "#333",
    5: "#555",
  },
  dark: {
    main: "#f2f3f4",
    light: "#fff",
    dark: "#ddd",
    text: "#000",
    ...extraColors?.dark?.dark,
  },
  light: {
    main: "#111",
    light: "#555",
    dark: "#333",
    text: "#fff",
    ...extraColors?.dark?.light,
  },
  textSecondary: {
    main: "#666",
    light: "#777",
    dark: "#444",
    text: "#fff",
    ...extraColors?.dark?.textSecondary,
  },
};

export default function colors(theme: ThemeTypes) {
  const dynamicColors = theme === "dark" ? darkColors : lightColors;
  return {
    ...extraColors[theme],
    primary: {
      main: "#f80",
      light: "#FEFFD3",
      dark: "#fa0",
      text: "#fff",
      ...extraColors?.light?.primary,
    },
    secondary: {
      main: "#f11",
      light: "#f43",
      dark: "#d00",
      text: "#fff",
      ...extraColors?.light?.secondary,
    },
    light: {
      main: "#fff",
      light: "#fff",
      dark: "#ddd",
      text: "#000",
      ...extraColors?.light?.light,
    },
    dark: {
      main: "#000",
      light: "#777",
      dark: "#111",
      text: "#fff",
      ...extraColors?.light?.dark,
    },
    textSecondary: {
      main: "#aaa",
      light: "#bbb",
      dark: "#777",
      text: "#123",
      ...extraColors?.light?.textSecondary,
    },
    blue: {
      main: "#09F",
      light: "#39f",
      dark: "#028",
      text: "#fff",
      ...extraColors?.light?.blue,
    },
    info: {
      main: "#09f",
      light: "#3af",
      dark: "#08a",
      text: "#fff",
      ...extraColors?.light?.info,
    },
    success: {
      main: "#0a4",
      text: "#fff",
      light: "#5c3",
      dark: "#062",
      ...extraColors?.light?.success,
    },

    warning: {
      main: "#fa2",
      light: "#fc7",
      dark: "#f90",
      text: "#fff",
      ...extraColors?.light?.warning,
    },
    error: {
      main: "#D22",
      text: "#fff",
      light: "#f43",
      dark: "#a20",
      ...extraColors?.light?.error,
    },
    ...dynamicColors,
  };
}
