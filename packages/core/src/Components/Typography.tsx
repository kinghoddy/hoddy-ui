import React, { forwardRef } from "react";
import { StyleSheet, Text } from "react-native";
import { ms } from "react-native-size-matters";
import { getConfig } from "../config/KeyManager";
import { useColors } from "../hooks";
import { TypographyProps } from "../types";
import { getFontFamily } from "../utility";

// Default font sizes (used as fallback)
const DEFAULT_FONT_SIZES = {
  h1: ms(42),
  h2: ms(37),
  h3: ms(32),
  h4: ms(27),
  h5: ms(22),
  h6: ms(17),
  body1: ms(15),
  body2: ms(12),
  caption: ms(10),
};

const Typography: React.FC<TypographyProps> = forwardRef(
  (
    {
      children,
      color = "dark",
      style = {},
      textCase,
      variant = "body1",
      align = "left",
      gutterBottom = 0,
      adjustsFontSizeToFit,
      fontWeight = 400,
      fontFamily, // NEW PROP ADDED
      fontSize,
      ...props
    },
    ref
  ) => {
    const colors: any = useColors();
    const config = getConfig();
    const customFontSizes = config.TYPOGRAPHY?.fontSizes;

    // Get font size: prop > config > default, then apply ms() scaling
    const baseFontSize =
      customFontSizes?.[variant] ?? DEFAULT_FONT_SIZES[variant];
    const f = fontSize || baseFontSize;
    const styles: any = StyleSheet.create({
      text: {
        lineHeight: f * 1.2,
        fontSize: f,
        marginBottom: ms(gutterBottom) || 0,
        color: colors[color]?.main || color,
        textTransform: textCase,
        alignItems: "center",
        textAlign: align,
        fontWeight: fontWeight,
        fontFamily: fontFamily || getFontFamily(fontWeight),
      },
    });

    return (
      <Text
        ref={ref as any}
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
