import React, { FC, useMemo } from "react";
import {
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ScaledSheet, ms } from "react-native-size-matters";
import { useColors } from "../hooks";
import { OTPInputProps } from "../types";

export const OTPInput: FC<OTPInputProps> = ({
  length = 6,
  onChange = () => {},
  value = "",
  variant = "outlined",
  spacing = 1,
  size = 45,
}) => {
  const inputRefs = useMemo(
    () =>
      Array(length)
        .fill(0)
        .map((_) => React.createRef<TextInput>()),
    [length]
  );

  const onChangeHandler = (val: string, index: number) => {
    if (value.length >= length && val.length > 0) return;
    // Handle pasting of full OTP
    if (val.length > 1) {
      const digits = val.replace(/\D/g, "").slice(0, length);
      onChange(digits);
      if (digits.length === length) {
        inputRefs[length - 1].current?.focus();
      }
      return;
    }
    // Handle backspace
    if (val.length === 0) {
      const newValue = value.slice(0, index) + value.slice(index + 1);
      onChange(newValue);
      if (index > 0) {
        inputRefs[index - 1].current?.focus();
      }
      return;
    }
    // Only allow numbers and take first digit
    const digit = val.replace(/\D/g, "").slice(0, 1);
    if (!digit) return;
    // Create new value string
    const newValue = value.slice(0, index) + digit + value.slice(index + 1);
    onChange(newValue);
    // Auto advance to next input if not at end
    if (index < length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const colors = useColors();
  const styles = ScaledSheet.create({
    root: {},
    container: { flexDirection: "row" },
    input: {
      height: ms(size),
      width: ms(size),
      borderColor: colors.white[5],
      backgroundColor: variant === "contained" ? colors.white[3] : undefined,
      borderWidth: variant === "outlined" ? 1 : 0,
      borderBottomWidth: variant === "contained" ? 0 : 1,
      marginHorizontal: ms(spacing * 5),
      textAlign: "center",
      borderRadius: variant === "text" ? 0 : 10,
      color: colors.dark.main,
      fontSize: ms(size * 0.5),
    },
  });

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        {[...Array(length)].map((_, index) => (
          <TextInput
            ref={inputRefs[index]}
            onChangeText={(val) => onChangeHandler(val, index)}
            value={value[index] || ""}
            blurOnSubmit={false}
            // maxLength={1}
            keyboardType="number-pad"
            key={index}
            style={[styles.input]}
          />
        ))}
      </View>
    </View>
  );
};
