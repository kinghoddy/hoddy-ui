import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/components/app-tabs";
import HoddyUI, { UIThemeProvider } from "@hoddy-ui/next";

HoddyUI.initialize({
  edgeToEdge: true,
  colors: {
    light: {
      primary: { main: "#407463" },
    },
  },
});

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <>
      {/* <UIThemeProvider> */}
      {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */}
      <AnimatedSplashOverlay />
      <AppTabs />
      {/* </ThemeProvider> */}
      {/* </UIThemeProvider> */}
    </>
  );
}
