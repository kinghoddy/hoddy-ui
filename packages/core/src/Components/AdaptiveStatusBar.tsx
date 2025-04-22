import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { Platform, StatusBar } from "react-native";
import { useColors, useTheme } from "../hooks";

const AdaptiveStatusBar = ({ translucent = false }) => {
  const [focused, setFocused] = useState(false);
  const colors = useColors();
  const theme = useTheme();
  useFocusEffect(
    React.useCallback(() => {
      // setFocused(true);
      StatusBar.setBarStyle(
        theme === "dark" ? "light-content" : "dark-content"
      );
      if (Platform.OS === "android") {
        StatusBar.setBackgroundColor(
          translucent ? "transparent" : colors.white[1]
        );
        StatusBar.setTranslucent(true);
      }
      // return () => setFocused(false);
    }, [theme])
  );

  React.useEffect(() => {
    // setFocused(true);
    StatusBar.setBarStyle(theme === "dark" ? "light-content" : "dark-content");
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(colors.white[1] + (translucent ? "0" : ""));
      StatusBar.setTranslucent(true);
    }
    // return () => setFocused(false);
  }, [theme]);
  return <></>;
};

export default AdaptiveStatusBar;
