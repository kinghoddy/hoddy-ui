import React, { useEffect, useState } from "react";
import {
  LayoutAnimation,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import { useColors } from "../hooks";
import { MaterialIcons } from "@expo/vector-icons";
import { FlashMessageProps } from "../types";
import Typography from "./Typography";

export let showFlashMessage: (msg: FlashMessageProps) => void = () => {
  console.log("hi");
};

const FlashMessage: React.FC = () => {
  const { top } = useSafeAreaInsets();
  const [message, setMessage] = useState<null | FlashMessageProps>(null);
  const [show, setShow] = useState(false);
  const colors = useColors();
  const type = message?.type || "success";

  showFlashMessage = (msg: FlashMessageProps) => {
    setMessage(msg);
    setTimeout(() => {
      setShow(true);
    }, 50);

    setTimeout(() => {
      setShow(false);
      setTimeout(() => {
        setMessage(null);
      }, 500);
    }, msg.duration || 3000);
  };
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [show]);

  const styles = ScaledSheet.create({
    root: {
      position: "absolute",
      top: show ? 0 : -200,
      zIndex: 1000,
      left: 0,
      paddingTop: top + 10,
      paddingHorizontal: "15@ms",
      backgroundColor: colors[type].main,
      width: "100%",
      paddingBottom: "15@ms",
    },

    action: {
      borderRadius: 20,
      marginTop: "10@vs",
      flexDirection: "row",
      justifyContent: "center",
      paddingHorizontal: "20@ms",
      paddingVertical: "8@vs",
      backgroundColor: "#fff3",
    },
  });

  return (
    <View style={styles.root}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          {message?.title && (
            <Typography
              variant="h6"
              fontWeight={600}
              gutterBottom={3}
              style={{ color: "#fff" }}
            >
              {message?.title}
            </Typography>
          )}
          <Typography style={{ color: "#fff" }}>{message?.message}</Typography>
        </View>
        {/* <MaterialIcons color="#fff" size={36} name="error-outline" /> */}
      </View>

      {message?.actions?.map((cur) => (
        <TouchableOpacity style={styles.action} onPress={cur.onPress}>
          <Typography fontWeight={700} style={{ color: "#fff" }}>
            {cur.title}
          </Typography>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FlashMessage;
