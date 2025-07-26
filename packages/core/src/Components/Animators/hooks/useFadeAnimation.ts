import { useEffect } from "react";
import { Platform } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import useAppState from "./useAppState";

interface UseFadeAnimationProps {
  duration?: number;
  delay?: number;
  closeAfter?: number | null;
}

export const useFadeAnimation = ({
  duration = 1000,
  delay = 0,
  closeAfter = null,
}: UseFadeAnimationProps = {}) => {
  const opacity = useSharedValue(0);
  const { isActive } = useAppState();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    if (!isActive && Platform.OS === "ios") {
      opacity.value = 0;
      return;
    }

    // Fade-in animation
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration }, () => {
        if (closeAfter) {
          // Schedule fade-out after closeAfter duration
          setTimeout(() => {
            opacity.value = withTiming(0, { duration });
          }, closeAfter);
        }
      })
    );
  }, [opacity, duration, delay, closeAfter, isActive]);

  return {
    animatedStyle,
  };
};
