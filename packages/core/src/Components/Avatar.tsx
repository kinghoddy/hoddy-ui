import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
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
  icon,
}) => {
  const colors = useColors();
  const [imageError, setImageError] = useState(false);
  const styles: any = ScaledSheet.create({
    root: {
      borderRadius: 150,
      height: ms(size),
      width: ms(size),
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      borderWidth: variant === "outlined" ? 5 : 0,
      borderColor: variant === "outlined" ? "#fff" : "#0000",
      backgroundColor:
        variant === "outlined"
          ? undefined
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
      {source && !imageError ? (
        <Image
          resizeMode="cover"
          style={styles.image}
          source={source}
          onError={() => setImageError(true)}
        />
      ) : label ? (
        <Typography style={{ color: colors[color].text }}>
          {label[0]}
        </Typography>
      ) : icon ? (
        icon
      ) : (
        <Ionicons name="person" color="#fff" size={Math.round(size / 1.5)} />
      )}
    </View>
  );
};

export default Avatar;
