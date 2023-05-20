import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Image, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { useColors } from "../hooks";
import { AvatarProps } from "../types";
import Typography from "./Typography";

const Avatar: React.FC<AvatarProps> = ({
  color = "dark",
  label,
  variant = "contained",
  source,
  size = 48,
  style = {},
}) => {
  const colors = useColors();
  const styles: any = ScaledSheet.create({
    root: {
      borderRadius: 150,
      height: size + "@ms",
      width: size + "@ms",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      borderWidth: variant === "outlined" ? 5 : 0,
      borderColor: variant === "outlined" ? "#fff" : "#0000",
      backgroundColor:
        variant === "outlined"
          ? null
          : label
          ? colors[color].main
          : colors.white[4],
      ...style,
    },
    image: {
      height: "110%",
      width: "110%",
    },
  });

  return (
    <View style={styles.root}>
      {source ? (
        <Image resizeMode="cover" style={styles.image} source={source} />
      ) : label ? (
        <Typography style={{ color: colors[color].text }}>
          {label[0]}
        </Typography>
      ) : (
        <AntDesign name="user" color="#fff" size={Math.round(size / 1.5)} />
      )}
    </View>
  );
};

export default Avatar;
