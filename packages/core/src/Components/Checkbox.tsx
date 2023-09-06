import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { useColors } from "../hooks";
import { CheckboxProps } from "../types";

export const CheckBox: FC<CheckboxProps> = ({
  color = "primary",
  checked,
  size = 24,
  label,
  style = {},
  onChange,
}) => {
  const iconName = checked ? "checkbox-marked" : "checkbox-blank-outline";
  const colors = useColors();

  const styles = ScaledSheet.create({
    container: {
      alignItems: "center",
      flexDirection: "row",
      ...style,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onChange}>
        <MaterialCommunityIcons
          name={iconName}
          size={size}
          color={colors[color].main}
        />
      </TouchableOpacity>
      {label}
    </View>
  );
};
