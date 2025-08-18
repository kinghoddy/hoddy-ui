import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { StyleSheet, View } from "react-native";
import { SafeAreaViewProps } from "../types";

export const SafeAreaView: React.FC<SafeAreaViewProps> = ({
  children,
  style,
}) => {
  const { top, bottom } = useSafeAreaInsets();
  const styles = StyleSheet.create({
    root: {
      paddingTop: top,
      paddingBottom: bottom,
      flex: 1,
    },
  });
  return <View style={[styles.root, style]}>{children}</View>;
};
