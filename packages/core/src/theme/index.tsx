import AsyncStorage from "@react-native-async-storage/async-storage";
import * as NavigationBar from "expo-navigation-bar";
import * as SystemUI from "expo-system-ui";
import React, { createContext, useReducer, useState } from "react";
import { Platform, useColorScheme } from "react-native";
import {
  FlashMessageProps,
  ThemeActionTypes,
  ThemeContext,
  ThemeProviderProps,
  ThemeState,
  ThemeTypes,
} from "../types";
import FlashMessage from "../Components/FlashMessage";

export const UIThemeContext = createContext<ThemeContext>({
  themeState: { mode: "default", value: "light" },
  showFlashMessage: null,
});

function themeReducer(
  state: ThemeState,
  { type, payload }: ThemeActionTypes
): ThemeState {
  console.log(type, payload);
  // Platform
  if (payload === "dark" || type === "dark") {
    SystemUI.setBackgroundColorAsync("#000000");
    if (Platform.OS === "android") {
      NavigationBar.setButtonStyleAsync("light");
      NavigationBar.setBackgroundColorAsync("#000000");
    }
  } else {
    SystemUI.setBackgroundColorAsync("#ffffff");
    if (Platform.OS === "android") {
      NavigationBar.setButtonStyleAsync("dark");
      NavigationBar.setBackgroundColorAsync("#fff");
    }
  }

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

export const UIThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeState, themeDispatch] = useReducer(themeReducer, {
    mode: "default",
    value: "light",
  });
  const [showFlashMessage, setShowFlashMessage] =
    useState<null | FlashMessageProps>(null);
  const colorScheme: ThemeTypes = useColorScheme()!;

  React.useEffect(() => {
    AsyncStorage.getItem("theme").then((val: any) => {
      if (val) {
        if (val === "default") {
          themeDispatch({
            type: "default",
            payload: colorScheme,
          });
        } else
          themeDispatch({
            type: val,
          });
      } else {
        themeDispatch({
          type: "default",
          payload: colorScheme,
        });
      }
    });
  }, [colorScheme]);
  return (
    <UIThemeContext.Provider
      value={{
        themeState,
        themeDispatch,
        showFlashMessage,
        setShowFlashMessage,
      }}
    >
      {children}
      <FlashMessage />
    </UIThemeContext.Provider>
  );
};
