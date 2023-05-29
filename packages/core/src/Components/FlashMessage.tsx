import React, { createRef, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import { useColors } from "../hooks";
import { UIThemeContext } from "../theme";
import { FlashMessageProps } from "../types";
import Typography from "./Typography";

export const flashMessageRef = createRef<{
  value: (value: FlashMessageProps) => void;
}>();
export const showFlashMessage = ({
  type,
  actions,
  message,
  title,
}: FlashMessageProps) => {
  if (flashMessageRef.current) {
    flashMessageRef.current.value({ type, actions, message, title });
  }
};

const FlashMessage: React.FC = () => {
  const { top } = useSafeAreaInsets();
  const colors = useColors();
  const { showFlashMessage, setShowFlashMessage } = useContext(UIThemeContext);
  const [show, setShow] = useState(false);
  const type = showFlashMessage?.type || "success";

  useEffect(() => {
    flashMessageRef.current?.value = setShowFlashMessage;
  }, [setShowFlashMessage]);
  const styles = ScaledSheet.create({
    root: {
      position: "absolute",
      top: 0,
      zIndex: 1000,
      left: 0,
      paddingTop: top + 10,
      paddingHorizontal: "15@ms",
      backgroundColor: colors[type].main,
      width: "100%",
      paddingBottom: "10@ms",
    },
  });
  useEffect(() => {
    if (showFlashMessage?.message) setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 2000);
  }, [showFlashMessage?.message]);
  return (
    <View style={styles.root}>
      {showFlashMessage?.title && (
        <Typography
          variant="body2"
          fontWeight={600}
          gutterBottom={3}
          style={{ color: "#fff" }}
        >
          {showFlashMessage?.title}
        </Typography>
      )}
      <Typography fontWeight={700} style={{ color: "#fff" }}>
        {showFlashMessage?.message}
      </Typography>
    </View>
  );
};

export default FlashMessage;
