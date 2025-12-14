import { useContext } from "react";
import { Platform, useColorScheme } from "react-native";
import { UIThemeContext } from "./theme";
import colors from "./theme/colors";
import { ThemeModes, ThemeTypes } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useColors = () => {
  const { themeState } = useContext(UIThemeContext);
  return colors(themeState.value);
};

export const useTheme = () => {
  const { themeState } = useContext(UIThemeContext);
  return themeState.value;
};

export const useThemeContext = () => {
  const { themeState: theme, themeDispatch } = useContext(UIThemeContext);
  const colorScheme: ThemeTypes = useColorScheme()!;

  const setTheme = (theme: ThemeModes) => {
    if (theme === "default") {
      themeDispatch?.({ type: "default", payload: colorScheme });
    } else {
      themeDispatch?.({ type: theme });
    }
  };
  return { theme, setTheme };
};

export const useNavScreenOptions = (type: "stack" | "tab" | "drawer") => {
  const colors = useColors();
  const options: any = {
    stack: {
      headerShown: false,
      headerStyle: {
        backgroundColor: colors.white[1],
      },
      headerShadowVisible: false,
      contentStyle: {
        backgroundColor: colors.white[1],
      },
      headerTitleStyle: {
        color: colors.black[1],
      },
      headerTintColor:
        Platform.OS === "android" ? colors.black[1] : colors.blue.light,
    },
    tab: {
      headerShown: false,
      headerTintColor: colors.dark.main,
      tabBarStyle: {
        borderTopColor: colors.white[2],
        borderColor: colors.white[2],
        borderTopWidth: 1,
        backgroundColor: colors.white[1],
      },
      tabBarActiveTintColor: colors.primary.main,
      tabBarInactiveTintColor: colors.textSecondary.main,
      tabBarLabelStyle: {
        // fontSize: ms(12),
      },
    },
    drawer: {
      headerShown: false,
      drawerActiveTintColor: colors.primary.main,
      drawerInactiveTintColor: colors.textSecondary.main,
      sceneContainerStyle: {
        backgroundColor: colors.white[2],
      },
      drawerStyle: {
        backgroundColor: colors.white[1],
      },
      headerStyle: {
        backgroundColor: colors.white[1],
      },
      headerTitleStyle: {
        color: colors.dark.main,
      },
    },
  };

  return options[type];
};
