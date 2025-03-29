import React, { forwardRef } from "react";
import { StyleSheet, Text } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { useColors } from "../hooks";
import { TypographyProps } from "../types";
import { getConfig } from "../config/KeyManager";

const Typography: React.FC<TypographyProps> = forwardRef(
  (
    {
      children,
      color = "dark",
      style = {},
      textCase = null,
      variant = "body1",
      align = "left",
      gutterBottom = 0,
      numberOfLines,
      adjustsFontSizeToFit,
      fontWeight = 400,
      fontFamily, // NEW PROP ADDED
      ...props
    },
    ref
  ) => {
    const colors: any = useColors();
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
        fontFamily: fontFamily || getConfig().DEFAULT_FONT_FAMILY || "System", // Use custom font if provided, else default
      },
    });

    return (
      <Text
        ref={ref as any}
        numberOfLines={numberOfLines}
        adjustsFontSizeToFit={adjustsFontSizeToFit}
        style={[styles.text, style]} // Ensures external styles are applied
        {...props}
      >
        {children}
      </Text>
    );
  }
);

export default Typography;
