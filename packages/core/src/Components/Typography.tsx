import React, { forwardRef } from "react";
import { StyleSheet, Text } from "react-native";
import { getConfig } from "../config/KeyManager";
import { useColors } from "../hooks";
import { ms } from "../scaling";
import { TypographyProps } from "../types";
import { getFontFamily } from "../utility";

// Design-time font sizes (px); scaled via ms() at render for tablet factor / device
const DEFAULT_FONT_SIZE_PX = {
  h1: 42,
  h2: 37,
  h3: 32,
  h4: 27,
  h5: 22,
  h6: 17,
  body1: 15,
  body2: 12,
  caption: 10,
} as const;

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
      lineHeight,
      ...props
    },
    ref,
  ) => {
    const colors: any = useColors();
    const config = getConfig();
    const customFontSizes = config.TYPOGRAPHY?.fontSizes;

    // Get font size: prop > style > scaled(config | default px)
    const designPx =
      customFontSizes?.[variant] ?? DEFAULT_FONT_SIZE_PX[variant];
    const scaledFontSize = ms(designPx);
    const f = fontSize ?? (style as any)?.fontSize ?? scaledFontSize;
    const lh = lineHeight || f * 1.2;
    const styles: any = StyleSheet.create({
      text: {
        lineHeight: lh,
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
  },
);

export default Typography;
