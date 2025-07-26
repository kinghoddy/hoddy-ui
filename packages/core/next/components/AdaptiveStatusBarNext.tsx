import { useFocusEffect } from "expo-router";
import React, { useState } from "react";
import { Platform, StatusBar } from "react-native";
import { useColors, useTheme } from "../../src/hooks";

const AdaptiveStatusBar = ({ translucent = false }) => {
  const [focused, setFocused] = useState(false);
  const colors = useColors();
  const theme = useTheme();
  const statusbarHandler = () => {
    StatusBar.setBarStyle(theme === "dark" ? "light-content" : "dark-content");
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(
        translucent ? "transparent" : colors.white[1]
      );
      StatusBar.setTranslucent(true);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      statusbarHandler();
    }, [theme])
  );

  React.useEffect(() => {
    statusbarHandler();
  }, [theme]);
  return <></>;
};

export default AdaptiveStatusBar;
