import React from "react";
import { View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
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
      width: `${100 / col}%`,
      padding: ms(spacing * 10),
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
      margin: `${-spacing * 10}@ms`,
      flexDirection: "row",
    },
  });
  return <View children={children} style={[styles.grid, style]} />;
};
