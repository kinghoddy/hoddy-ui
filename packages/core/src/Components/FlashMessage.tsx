import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import { useColors } from "../hooks";
import { FlashMessageProps } from "../types";
import Typography from "./Typography";

const FlashMessage: React.FC<FlashMessageProps> = ({
  title,
  message,
  type,
}) => {
  const { top } = useSafeAreaInsets();
  const colors = useColors();
  const [show, setShow] = useState(false);
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
    if (message) setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 2000);
  }, [message]);
  return show ? (
    <View style={styles.root}>
      {title && (
        <Typography
          variant="body2"
          fontWeight={600}
          gutterBottom={3}
          style={{ color: "#fff" }}
        >
          {title}
        </Typography>
      )}
      <Typography fontWeight={700} style={{ color: "#fff" }}>
        {message}
      </Typography>
    </View>
  ) : (
    <></>
  );
};

export default FlashMessage;
