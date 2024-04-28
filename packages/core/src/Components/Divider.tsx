import { FC } from "react";
import { View } from "react-native";
import { ScaledSheet, ms } from "react-native-size-matters";
import { useColors } from "../hooks";
import { DividerProps } from "../types";

export const Divider: FC<DividerProps> = ({
  height = 1,
  color = "textSecondary",
  gutterBottom = 0,
  style,
}) => {
  const colors = useColors();

  const styles = ScaledSheet.create({
    root: {
      height,
      backgroundColor: colors[color].main,
      marginBottom: ms(gutterBottom),
      ...style,
    },
  });
  return <View style={styles.root} />;
};
