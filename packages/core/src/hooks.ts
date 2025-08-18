import { useContext } from "react";
import { Dimensions, Platform } from "react-native";
import { vs } from "react-native-size-matters";
import { UIThemeContext } from "./theme";
import colors from "./theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useColors = () => {
  const { themeState } = useContext(UIThemeContext);
  return colors(themeState.value);
};

export const useTheme = () => {
  const { themeState } = useContext(UIThemeContext);
  return themeState.value;
};
export const useNavScreenOptions = (type: "stack" | "tab" | "drawer") => {
  const colors = useColors();
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();
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
        borderTopColor: theme === "dark" ? colors.light.main : colors.white[2],
        borderTopWidth: 1,
        backgroundColor: colors.white[1],
      },
      tabBarActiveTintColor: colors.blue.main,
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
