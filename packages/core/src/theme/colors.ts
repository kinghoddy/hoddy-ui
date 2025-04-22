import { ThemeTypes, extraColorTypes } from "../types";

let extraColors: extraColorTypes = {};

export const setExtraColors = (c: extraColorTypes) => (extraColors = c);

export default function colors(theme: ThemeTypes) {
  const lightColors = {
    white: {
      1: "#ffffff",
      2: "#f7f7f7",
      3: "#eeeeee",
      4: "#dddddd",
      5: "#bbbbbb",
      ...extraColors?.light?.white,
    },
    black: {
      1: "#888888",
      2: "#777777",
      3: "#555555",
      4: "#333333",
      5: "#000000",
      ...extraColors?.light?.black,
    },
  };

  const darkColors = {
    black: {
      1: "#ffffff",
      2: "#f7f7f7",
      3: "#eeeeee",
      4: "#dddddd",
      5: "#aaaaaa",
      ...extraColors?.dark?.black,
    },
    white: {
      1: "#060606",
      2: "#222222",
      3: "#333333",
      4: "#444444",
      5: "#555555",
      ...extraColors?.dark?.white,
    },
    dark: {
      main: "#f2f3f4",
      light: "#ffffff",
      dark: "#dddddd",
      text: "#000000",
      ...extraColors?.dark?.dark,
    },
    light: {
      main: "#111111",
      light: "#555555",
      dark: "#333333",
      text: "#ffffff",
      ...extraColors?.dark?.light,
    },
    textSecondary: {
      main: "#666666",
      light: "#777777",
      dark: "#444444",
      text: "#ffffff",
      ...extraColors?.dark?.textSecondary,
    },
    primary: {
      main: "#ff8800",
      light: "#feffd3",
      dark: "#ffaa00",
      text: "#ffffff",
      ...extraColors?.light?.primary,
      ...extraColors?.dark?.primary,
    },
  };

  const dynamicColors = theme === "dark" ? darkColors : lightColors;
  return {
    ...extraColors[theme],
    primary: {
      main: "#ff8800",
      light: "#feffd3",
      dark: "#ffaa00",
      text: "#ffffff",
      ...extraColors?.light?.primary,
    },
    secondary: {
      main: "#ff1111",
      light: "#ff4433",
      dark: "#dd0000",
      text: "#ffffff",
      ...extraColors?.light?.secondary,
    },
    light: {
      main: "#ffffff",
      light: "#ffffff",
      dark: "#dddddd",
      text: "#000000",
      ...extraColors?.light?.light,
    },
    dark: {
      main: "#000000",
      light: "#777777",
      dark: "#111111",
      text: "#ffffff",
      ...extraColors?.light?.dark,
    },
    textSecondary: {
      main: "#aaaaaa",
      light: "#bbbbbb",
      dark: "#777777",
      text: "#112233",
      ...extraColors?.light?.textSecondary,
    },
    blue: {
      main: "#0099ff",
      light: "#3399ff",
      dark: "#002288",
      text: "#ffffff",
      ...extraColors?.light?.blue,
    },
    info: {
      main: "#0099ff",
      light: "#33aaff",
      dark: "#0088aa",
      text: "#ffffff",
      ...extraColors?.light?.info,
    },
    success: {
      main: "#00aa44",
      text: "#ffffff",
      light: "#55cc33",
      dark: "#006622",
      ...extraColors?.light?.success,
    },
    warning: {
      main: "#ffaa22",
      light: "#ffcc77",
      dark: "#ff9900",
      text: "#ffffff",
      ...extraColors?.light?.warning,
    },
    error: {
      main: "#dd2222",
      text: "#ffffff",
      light: "#ff4433",
      dark: "#aa2200",
      ...extraColors?.light?.error,
    },
    ...dynamicColors,
  };
}
