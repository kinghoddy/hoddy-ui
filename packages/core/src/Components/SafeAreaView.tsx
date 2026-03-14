import React, { forwardRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { StyleSheet, View } from "react-native";
import { SafeAreaViewProps } from "../types";

export const SafeAreaView = forwardRef<View, SafeAreaViewProps>(
  ({ children, style, ...rest }, ref) => {
    const { top, bottom } = useSafeAreaInsets();
    const styles = StyleSheet.create({
      root: {
        paddingTop: top,
        paddingBottom: bottom,
        flex: 1,
      },
    });
    return (
      <View ref={ref} style={[styles.root, style]} {...rest}>
        {children}
      </View>
    );
  }
);
