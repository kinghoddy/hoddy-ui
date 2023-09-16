import React, { FC, useMemo, useState } from "react";
import { TextInput, View } from "react-native";
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
            onChangeText={(val) => {
              if (val.length === 1) {
                if (index !== length - 1) inputRefs[index + 1].current?.focus();
                let text = value;

                text = text.slice(0, index) + val + text.slice(index + 1);
                onChange(text);
              } else if (val.length === 0) {
                if (index !== 0) {
                  inputRefs[index - 1].current?.focus();
                  let text = value;

                  text = text.slice(0, index);
                  onChange(text);
                } else onChange("");
              } else {
                let text = val.replace(/\D/g, "").slice(0, length);
                onChange(text);
                inputRefs[
                  text.length < length - 1 ? text.length : length - 1
                ]?.current?.focus();
              }
            }}
            value={value[index] || ""}
            // maxLength={1}
            blurOnSubmit={false}
            keyboardType="number-pad"
            key={index}
            style={[styles.input]}
          />
        ))}
      </View>
    </View>
  );
};
