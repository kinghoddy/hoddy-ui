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

import React, { useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useColors } from "../hooks";
import { PopupProps } from "../types";
import { IconButton } from "./Button";
import Typography from "./Typography";
import { UIThemeProvider } from "../theme";

export const Popup: React.FC<PopupProps> = ({
  title,
  sheet,
  bare = false,
  keyboardVerticalOffset,
  children,
  open,
  onClose = () => {},
}) => {
  const colors = useColors();
  const [show, setShow] = useState(open);
  const [showSecondary, setShowSecondary] = useState(false);

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
      paddingBottom: sheet ? "30@ms" : 0,
      backgroundColor: colors.white[2],
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomRightRadius: sheet ? 0 : 20,
      borderBottomLeftRadius: sheet ? 0 : 20,
      width: "100%",
    },
    content: {
      paddingHorizontal: bare ? undefined : "10@ms",
      // flex: 1,
    },
    title: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: "5@ms",
      paddingHorizontal: "10@ms",
      marginBottom: "10@ms",
    },
    backdrop: {
      position: "absolute",
      height: "100%",
      zIndex: -1,
      width: "100%",
      backgroundColor: "#000b",
    },
  });

  React.useEffect(() => {
    setShow(open);
    setTimeout(() => {
      setShowSecondary(open);
    }, 500);
  }, [open]);

  const closeAction = () => {
    setShowSecondary(false);
    setTimeout(() => {
      setShow(false);
      onClose();
    }, 300);
  };

  return (
    <>
      <Modal
        transparent
        animationType="fade"
        statusBarTranslucent
        visible={show}
        onRequestClose={closeAction}
      >
        <View style={styles.backdrop} />
        <UIThemeProvider>
          <Modal
            transparent
            animationType="slide"
            statusBarTranslucent
            visible={showSecondary}
            onRequestClose={closeAction}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.root}>
                {open && (
                  <Pressable
                    style={StyleSheet.absoluteFill}
                    onPress={closeAction}
                  />
                )}

                <KeyboardAvoidingView
                  style={styles.avoidingView}
                  keyboardVerticalOffset={keyboardVerticalOffset}
                  behavior={Platform.OS === "ios" ? "position" : "padding"}
                >
                  <View style={styles.container}>
                    {!bare && (
                      <View style={styles.title}>
                        <IconButton
                          size={20}
                          icon="close"
                          onPress={closeAction}
                        />
                        <View style={{ flex: 1 }}>
                          <Typography color="textSecondary" align="center">
                            {title}
                          </Typography>
                        </View>
                      </View>
                    )}

                    <View style={styles.content}>{children}</View>
                  </View>
                </KeyboardAvoidingView>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </UIThemeProvider>
      </Modal>
    </>
  );
};
