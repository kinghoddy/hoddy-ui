import React, { useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import { useColors } from "../hooks";
import { FlashMessageProps } from "../types";
import Typography from "./Typography";

export let showFlashMessage: (msg: FlashMessageProps) => void = () => {};

const FlashMessage: React.FC = () => {
  const { top } = useSafeAreaInsets();
  const [message, setMessage] = useState<null | FlashMessageProps>(null);
  const colors = useColors();
  const type = message?.type || "success";
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Animated values
  const translateY = useSharedValue(-200);
  const opacity = useSharedValue(0);

  const hideMessage = () => {
    setMessage(null);
  };

  const closeMessage = () => {
    // Clear existing timeout if any
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Animate out immediately
    translateY.value = withTiming(-200, { duration: 300 });
    opacity.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(hideMessage)();
    });
  };

  showFlashMessage = (msg: FlashMessageProps) => {
    // Clear existing timeout if any
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Reset position immediately before starting new animation
    translateY.value = -200;
    opacity.value = 0;

    setMessage(msg);

    // Animate in
    translateY.value = withTiming(0, { duration: 300 });
    opacity.value = withTiming(1, { duration: 300 });

    // Animate out after duration
    const duration = msg.duration || 3000;
    timeoutRef.current = setTimeout(() => {
      translateY.value = withTiming(-200, { duration: 300 });
      opacity.value = withTiming(0, { duration: 300 }, () => {
        runOnJS(hideMessage)();
      });
      timeoutRef.current = null;
    }, duration);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

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
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
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

  if (!message) return null;

  return (
    <Animated.View style={[styles.root, animatedStyle]}>
      <TouchableOpacity onPress={closeMessage} activeOpacity={0.9}>
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
            <Typography style={{ color: "#fff" }}>
              {message?.message}
            </Typography>
          </View>
          {/* <MaterialIcons color="#fff" size={36} name="error-outline" /> */}
        </View>
      </TouchableOpacity>

      {message?.actions?.map((cur, i) => (
        <TouchableOpacity
          key={i}
          style={styles.action}
          onPress={() => {
            cur.onPress?.();
            closeMessage();
          }}
        >
          <Typography fontWeight={700} style={{ color: "#fff" }}>
            {cur.title}
          </Typography>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
};

export default FlashMessage;
