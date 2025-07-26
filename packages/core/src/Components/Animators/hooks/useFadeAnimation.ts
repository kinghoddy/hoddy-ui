import { useEffect, useRef } from "react";
import { Animated, Platform } from "react-native";
import useAppState from "./useAppState";

interface UseFadeAnimationProps {
  duration?: number;
  delay?: number;
  closeAfter?: number | null;
}

export const useFadeAnimation = ({
  duration = 1000,
  delay = 0,
  closeAfter = 2000,
}: UseFadeAnimationProps = {}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const { isActive } = useAppState();

  useEffect(() => {
    if (!isActive && Platform.OS === "ios") {
      opacity.stopAnimation();
    }
  }, [isActive]);

  useEffect(() => {
    // Fade-in animation
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start(() => {
      if (closeAfter) {
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration,
            useNativeDriver: true,
          }).start();
        }, closeAfter);
      }
    });

    return () => opacity.stopAnimation();
  }, [opacity, duration, delay, closeAfter]);

  return {
    animatedStyle: { opacity },
  };
};
