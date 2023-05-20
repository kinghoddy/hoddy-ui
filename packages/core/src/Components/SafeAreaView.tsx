import { SafeAreaView as Safe } from "react-native";
import React from "react";

import { Platform, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { SafeAreaViewProps } from "../types";

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? moderateScale(35) : 0,
  },
});

const SafeAreaView: React.FC<SafeAreaViewProps> = ({ children, style }) => {
  return <Safe style={{ ...styles.droidSafeArea, ...style }}>{children}</Safe>;
};

export default SafeAreaView;
