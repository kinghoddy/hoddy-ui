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
  },
  light: {
    main: "#111",
    light: "#555",
    dark: "#333",
    text: "#fff",
  },
  grey: {
    dark: "#d0d8d8",
    main: "#e4e0e4",
  },
  textSecondary: {
    main: "#666",
  },
  secondary: {
    main: "#a00",
    light: "#a33",
    dark: "#900",
    text: "#fff",
  },
  purple: {
    main: "#815",
    light: "#f4d",
    dark: "#a06",
    text: "#fff",
  },
};

let extraColors: extraColorTypes = {
  dark: {},
  light: {},
};

export const setExtraColors = (c: extraColorTypes) => (extraColors = c);

export default function colors(theme: ThemeTypes) {
  const dynamicColors = theme === "dark" ? darkColors : lightColors;
  return {
    primary: {
      main: "#f80",
      light: "#FEFFD3",
      dark: "#fa0",
      orange: "#F68B1E",
      text: "#fff",
    },
    secondary: {
      main: "#f11",
      light: "#f43",
      dark: "#d00",
      text: "#fff",
    },
    purple: {
      main: "#a09",
      light: "#f4d",
      dark: "#a06",
      text: "#fff",
    },
    light: {
      main: "#fff",
      light: "#fff",
      dark: "#ddd",
      text: "#000",
    },
    dark: {
      main: "#000",
      light: "#777",
      dark: "#111",
      text: "#fff",
      mid: "#f2f3f4",
    },
    textSecondary: {
      main: "#aaa",
      mid: "#9ab",
      dark: "#678",
      darkBlue: "#123",
    },
    blue: {
      main: "#09F",
      light: "#39f",
      dark: "#028",
      text: "#fff",
      navy: "#071440",
      soft: "#EBF2FF",
    },
    info: {
      main: "#09f",
      light: "#3af",
      dark: "#08a",
      text: "#fff",
    },
    success: {
      main: "#0a4",
      text: "#fff",
      light: "#5c3",
      dark: "#062",

      green: "#49D3BA",
      lighter: "#00A86B",
    },

    warning: {
      main: "#fa2",
      light: "#fc7",
      dark: "#f90",
      text: "#fff",
    },
    error: {
      main: "#D22",
      text: "#fff",
      light: "#f43",
      dark: "#a20",
      red: "#D92D20",
      soft: "#fee",
      bold: "#d22",
    },
    grey: {
      dark: "#101828",
      main: "#344054",
    },
    ...dynamicColors,
    ...extraColors[theme],
  };
}
