import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColors } from "../hooks";
import { CheckboxProps } from "../types";
import { ScaledSheet } from "react-native-size-matters";

const CheckBox: FC<CheckboxProps> = ({
  color = "primary",
  checked,
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
    title: {
      fontSize: 16,
      color: "#000",
      marginLeft: 5,
      fontWeight: "600",
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onChange}>
        <MaterialCommunityIcons
          name={iconName}
          size={24}
          color={colors[color].main}
        />
      </TouchableOpacity>
      {label}
    </View>
  );
};

export default CheckBox;
