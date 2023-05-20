import { useContext } from "react";
import { Platform } from "react-native";
import { ms, vs } from "react-native-size-matters";
import colors from "./theme/colors";
import { UIThemeContext } from "./theme";

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
  const options = {
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
        borderTopColor: colors.white[3],
        borderTopWidth: 1,
        // shadowColor: "#000",
        // shadowOffset: { height: -3, width: 0 },
        // shadowRadius: 7,
        // shadowOpacity: 0.1,
        height: vs(70),
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
