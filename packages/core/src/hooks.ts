import { useContext } from "react";
import { Dimensions, Platform } from "react-native";
import { vs } from "react-native-size-matters";
import { UIThemeContext } from "./theme";
import colors from "./theme/colors";

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
        borderTopColor: colors.white[3],
        borderTopWidth: 1,
        // shadowColor: "#000",
        // shadowOffset: { height: -3, width: 0 },
        // shadowRadius: 7,
        // shadowOpacity: 0.1,
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

  if (Platform.OS === "android") {
    options.tab.tabBarStyle.height = Dimensions.get("screen").height * 0.08;
    options.tab.tabBarStyle.paddingBottom = vs(15);
  }
  return options[type];
};
