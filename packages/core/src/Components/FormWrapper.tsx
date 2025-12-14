import React, { forwardRef } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import { FormWrapperProps } from "../types";

export const FormWrapper = forwardRef<ScrollView, FormWrapperProps>(
  (
    {
      children,
      behavior = Platform.OS === "ios" ? "padding" : "height",
      contentContainerStyle,
      mode = "scroll",
      keyboardVerticalOffset = 10,
      style = {},
      onScroll,
    },
    ref
  ) => {
    const { bottom } = useSafeAreaInsets();

    const defaultOffset = Platform.OS === "ios" ? -bottom : -bottom * 2;
    const styles = ScaledSheet.create({
      root: {
        width: "100%",
        flex: 1,
        ...style,
      },
    });

    return mode === "static" ? (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={styles.root}
          behavior={behavior}
          contentContainerStyle={styles.root}
          keyboardVerticalOffset={keyboardVerticalOffset || defaultOffset}
        >
          {children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    ) : (
      <KeyboardAvoidingView
        behavior={behavior}
        style={styles.root}
        keyboardVerticalOffset={keyboardVerticalOffset || defaultOffset}
      >
        <ScrollView
          ref={ref}
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={40}
          keyboardDismissMode="interactive"
          contentContainerStyle={contentContainerStyle}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
);
