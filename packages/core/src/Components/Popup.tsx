import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import React, { useEffect, useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ScaledSheet } from "react-native-size-matters";
import { useColors, useTheme } from "../hooks";
import { UIThemeProvider } from "../theme";
import { PopupProps } from "../types";
import { IconButton } from "./Button";
import Typography from "./Typography";

export const Popup: React.FC<PopupProps> = ({
  title,
  sheet,
  bare = false,
  keyboardVerticalOffset,
  children,
  open,
  onClose = () => {},
  style,
  onModalShow,
  onModalHide,
}) => {
  const theme = useTheme();
  const colors = useColors();
  const [modalVisible, setModalVisible] = useState(false);

  // Animation values
  const backdropOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(1000);

  // Trigger animations when open prop changes
  useEffect(() => {
    if (open) {
      setModalVisible(true);
      // Opening animation
      backdropOpacity.value = withTiming(1, { duration: 300 });
      contentTranslateY.value = withTiming(0, { duration: 300 }, () => {
        if (onModalShow) {
          runOnJS(onModalShow)();
        }
      });
    } else {
      // Closing animation
      backdropOpacity.value = withTiming(0, { duration: 200 });
      contentTranslateY.value = withTiming(1000, { duration: 200 }, () => {
        runOnJS(setModalVisible)(false);
        if (onModalHide) {
          runOnJS(onModalHide)();
        }
      });
    }
  }, [open]);

  // Animated styles
  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: contentTranslateY.value }],
  }));

  const styles: any = ScaledSheet.create({
    root: {
      height: "100%",
      width: "100%",
      justifyContent: sheet ? "flex-end" : "center",
    },
    avoidingView: {
      minHeight: typeof sheet === "number" ? sheet : undefined,
      maxHeight: "80%",
      zIndex: 1000,
      alignSelf: "center",
      maxWidth: sheet ? undefined : "90%",
      width: sheet ? "100%" : undefined,
    },
    container: {
      paddingBottom: sheet ? "30@ms" : undefined,
      backgroundColor: theme === "dark" ? "#111" : colors.white[2],
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomRightRadius: sheet ? 0 : 20,
      borderBottomLeftRadius: sheet ? 0 : 20,
      width: "100%",
      ...style,
    },
    content: {
      paddingHorizontal: bare ? undefined : "15@ms",
    },
    title: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: "50@ms",
    },
    titleIcon: {
      position: "absolute",
      left: "15@ms",
    },
    backdrop: {
      position: "absolute",
      height: "100%",
      zIndex: -1,
      width: "100%",
      backgroundColor: "#000b",
    },
  });

  const closeAction = () => {
    onClose();
  };

  return (
    <Modal
      transparent
      animationType="none"
      statusBarTranslucent
      visible={modalVisible}
      onRequestClose={closeAction}
    >
      <Animated.View style={[styles.backdrop, backdropAnimatedStyle]} />
      <UIThemeProvider>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.root}>
            {open && (
              <Pressable
                style={StyleSheet.absoluteFill}
                onPress={closeAction}
              />
            )}

            <Animated.View style={[styles.avoidingView, contentAnimatedStyle]}>
              <KeyboardAvoidingView
                keyboardVerticalOffset={keyboardVerticalOffset}
                behavior={Platform.OS === "ios" ? "position" : "padding"}
              >
                <View style={styles.container}>
                  {!bare && (
                    <View style={styles.title}>
                      <View style={styles.titleIcon}>
                        <IconButton
                          size={20}
                          icon="close"
                          onPress={closeAction}
                        />
                      </View>
                      <Typography align="center" fontWeight={500}>
                        {title}
                      </Typography>
                    </View>
                  )}

                  <View style={styles.content}>{children}</View>
                </View>
              </KeyboardAvoidingView>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </UIThemeProvider>
    </Modal>
  );
};
