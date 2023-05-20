import { View, Text } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { GridItemProps, GridProps } from "../types";

export const GridItem: React.FC<GridItemProps> = ({
  children,
  col = 2,
  alignItems,
  spacing = 1,
  style = {},
}) => {
  const styles = ScaledSheet.create({
    gridItem: {
      width: 100 / col + "%",
      padding: spacing * 10 + "@ms",
      alignItems: alignItems,
    },
  });
  return <View children={children} style={[styles.gridItem, style]} />;
};
export const Grid: React.FC<GridProps> = ({
  children,
  spacing = 1,
  style = {},
}) => {
  const styles = ScaledSheet.create({
    grid: {
      flexWrap: "wrap",
      marginHorizontal: -spacing * 10 + "@ms",
      flexDirection: "row",
    },
  });
  return <View children={children} style={[styles.grid, style]} />;
};
