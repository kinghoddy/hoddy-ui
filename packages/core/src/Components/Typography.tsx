import React from "react";
import { Text, StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useColors } from "../hooks";
import { TypographyProps } from "../types";

const Typography: React.FC<TypographyProps> = ({
  children,
  color = "dark",
  style = {},
  textCase = null,
  variant = "body1",
  align = "left",
  gutterBottom = 0,
  fontWeight = 400,
}) => {
  const colors = useColors();
  const fontSize = {
    h1: moderateScale(42),
    h2: moderateScale(37),
    h3: moderateScale(32),
    h4: moderateScale(27),
    h5: moderateScale(22),
    h6: moderateScale(17),
    body1: moderateScale(15),
    body2: moderateScale(12),
    caption: moderateScale(10),
  };
  const styles: any = StyleSheet.create({
    text: {
      fontSize: fontSize[variant],
      marginBottom: verticalScale(gutterBottom) || 0,
      color: colors[color]?.main || color,
      textTransform: textCase,
      alignItems: "center",
      textAlign: align,
      fontWeight: fontWeight.toString(),
    },
  });
  return (
    <Text adjustsFontSizeToFit style={{ ...styles.text, ...style }}>
      {children}
    </Text>
  );
};

export default Typography;
