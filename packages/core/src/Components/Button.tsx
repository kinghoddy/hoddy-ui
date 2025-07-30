import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { forwardRef } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { ScaledSheet, moderateScale, ms } from "react-native-size-matters";
import { getConfig } from "../config/KeyManager";
import { useColors, useTheme } from "../hooks";
import { ButtonProps, IconButtonProps, LinkButtonProps } from "../types";

export const LinkButton: React.FC<LinkButtonProps> = ({
  title,
  style = {},
  color = "blue",
  fontSize = 12,
  fontWeight = "400",
  disabled,
  onPress = () => {},
}) => {
  const colors = useColors();

  const styles: any = ScaledSheet.create({
    text: {
      fontSize: moderateScale(fontSize),
      fontWeight: fontWeight as any,
      fontFamily: getConfig().DEFAULT_FONT_FAMILY || "System",
      color: disabled ? "#777" : colors[color].main,
    },
  });
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text style={{ ...styles.text, ...style }}>{title}</Text>
    </TouchableOpacity>
  );
};

export const IconButton: React.FC<IconButtonProps> = ({
  style = {},
  color = "dark",
  disabled,
  icon,
  elevation,
  bg = false,
  size = 24,
  containerStyles = {},
  onPress = () => {},
  iconType = "material",
}) => {
  const colors = useColors();
  const theme = useTheme();
  const bgColor = theme === "light" ? "#fff" : "#222";
  const styles: any = ScaledSheet.create({
    container: {
      alignSelf: "flex-start",
      flexGrow: 0,
      backgroundColor: bg ? bgColor : elevation! > 0 ? bgColor : undefined,
      padding: "5@ms",
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: {
        height: 1,
        width: 0,
      },
      height: bg ? ms(size + 20) : undefined,
      width: bg ? ms(size + 20) : undefined,
      alignItems: "center",
      justifyContent: "center",
      shadowRadius: elevation,
      elevation: elevation,
      borderRadius: size * 5,
    },
    text: {
      color: disabled ? "#777" : colors[color].main,
    },
  });

  const IconComp = {
    material: MaterialIcons,
    ion: Ionicons,
  }[iconType];
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.3}
      style={{ ...styles.container, ...containerStyles }}
    >
      <IconComp style={{ ...styles.text, ...style }} name={icon} size={size} />
    </TouchableOpacity>
  );
};

const Button: React.FC<ButtonProps> = forwardRef(
  (
    {
      elevation = 0,
      onPress = () => {},
      disabled = false,
      title,
      loading,
      size = "normal",
      rounded = false,
      gutterBottom,
      style = {},
      fullWidth = false,
      translucent = false,
      color = "primary",
      variant = "contained",
      start,
      end,
    },
    ref
  ) => {
    const colors = useColors();

    const styles: any = ScaledSheet.create({
      con: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        justifyContent: "center",
        backgroundColor:
          variant === "text" || variant === "outlined"
            ? undefined
            : translucent
            ? translucent === "dark"
              ? colors.white[3] + "22"
              : colors.black[3] + "22"
            : loading
            ? colors[color].light
            : disabled
            ? colors.white[4]
            : colors[color].main,
        borderRadius: rounded ? 30 : 10,
        elevation: variant === "text" ? 0 : elevation,
        paddingVertical:
          size === "small" ? 8 : size === "large" ? "15@mvs" : "13@mvs",
        paddingHorizontal: size === "small" ? "10@ms" : "18@ms",
        borderColor: colors[color].main,
        borderWidth: variant === "outlined" ? 1 : 0,
        shadowColor: "#000",
        shadowRadius: elevation,
        marginBottom: gutterBottom,
        shadowOffset: {
          height: elevation / 2,
          width: 0,
        },
        shadowOpacity: variant === "text" ? 0 : 0.3,
        width: fullWidth ? "100%" : undefined,
        ...style,
      },
      text: {
        color: disabled
          ? variant === "text" || variant === "outlined"
            ? colors.black[1]
            : colors[color].text
          : colors[color][
              variant === "text" || variant === "outlined" ? "main" : "text"
            ],
        fontWeight: variant === "outlined" ? "700" : "500",
        fontSize: size === "small" ? "12@ms" : "13@ms",
        fontFamily: getConfig().DEFAULT_FONT_FAMILY || "System",
      },
    });

    return (
      <TouchableOpacity
        ref={ref as any}
        onPress={onPress}
        disabled={disabled}
        style={styles.con}
      >
        {start}
        {loading && (
          <ActivityIndicator
            size="small"
            color={colors[color].text}
            style={{ marginRight: 10 }}
          />
        )}
        <Text style={styles.text}>{title}</Text>
        {end}
      </TouchableOpacity>
    );
  }
);

export default Button;
