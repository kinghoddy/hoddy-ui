import AsyncStorage from "@react-native-async-storage/async-storage";
import * as NavigationBar from "expo-navigation-bar";
import * as SystemUI from "expo-system-ui";
import React, { createContext, useEffect, useReducer } from "react";
import { Appearance, Platform, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FlashMessage from "../Components/FlashMessage";
import { getConfig } from "../config/KeyManager";
import { useColors, useTheme } from "../hooks";
import {
  ThemeActionTypes,
  ThemeContext,
  ThemeProviderProps,
  ThemeState,
  ThemeTypes,
} from "../types";

export const UIThemeContext = createContext<ThemeContext>({
  themeState: { mode: "default", value: "light" },
});

function themeReducer(
  state: ThemeState,
  { type, payload }: ThemeActionTypes
): ThemeState {
  // Platform
  AsyncStorage.setItem("theme", type);
  switch (type) {
    case "dark":
      return { mode: "dark", value: "dark" };
    case "default":
      return { mode: "default", value: payload! };
    case "light":
      return { mode: "light", value: "light" };
    default:
      return state;
  }
}

const ConfigureSystemUI = () => {
  const theme = useTheme();
  const colors = useColors();

  useEffect(() => {
    const config = getConfig();
    // Appearance.setColorScheme(theme);

    if (colors) {
      SystemUI.setBackgroundColorAsync(colors.white[1]);
      if (Platform.OS === "android") {
        if (config.EDGE_TO_EDGE) {
          if (theme === "dark") {
            NavigationBar.setStyle("light");
          } else {
            NavigationBar.setStyle("dark");
          }
        } else {
          NavigationBar.setBackgroundColorAsync(colors.white[1]);
          if (theme === "dark") {
            NavigationBar.setButtonStyleAsync("light");
          } else {
            NavigationBar.setButtonStyleAsync("dark");
          }
        }
      }
    }
  }, [colors, theme]);

  return <></>;
};

export const UIThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeState, themeDispatch] = useReducer(themeReducer, {
    mode: "default",
    value: "light",
  });

  const colorScheme: ThemeTypes = useColorScheme()!;

  React.useEffect(() => {
    AsyncStorage.getItem("theme").then((val: any) => {
      if (val) {
        if (val === "default") {
          themeDispatch({
            type: "default",
            payload: colorScheme,
          });
          Appearance.setColorScheme(undefined);
        } else {
          themeDispatch({
            type: val,
          });
          Appearance.setColorScheme(val);
        }
      } else {
        themeDispatch({
          type: "default",
          payload: colorScheme,
        });
        Appearance.setColorScheme(undefined);
      }
    });
  }, [colorScheme]);
  return (
    <SafeAreaProvider>
      <UIThemeContext.Provider
        value={{
          themeState,
          themeDispatch,
        }}
      >
        {children}
        <FlashMessage />
        <ConfigureSystemUI />
      </UIThemeContext.Provider>
    </SafeAreaProvider>
  );
};
