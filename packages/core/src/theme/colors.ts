import { ThemeTypes } from "../types";

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
    1: "#111",
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
    main: "#000",
    light: "#555",
    dark: "#333",
    text: "#fff",
  },

  textSecondary: {
    main: "#777",
    light: "#aaa",
    dark: "#555",
    text: "#fff",
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

export default function colors(theme: ThemeTypes) {
  const dynamicColors = theme === "dark" ? darkColors : lightColors;
  return {
    primary: {
      main: "#FD7",
      light: "#FEFFD3",
      dark: "#fa0",
      orange: "#F68B1E",
      text: "#000",
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
    },
    textSecondary: {
      main: "#aaa",
      light: "#bbb",
      dark: "#777",
      text: "#000",
    },
    blue: {
      main: "#09F",
      light: "#39f",
      dark: "#028",
      text: "#fff",
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
    },
    ...dynamicColors,
  };
}
