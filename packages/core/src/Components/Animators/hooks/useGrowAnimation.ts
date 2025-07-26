import { useEffect, useRef } from "react";
import { Animated, Easing, Platform } from "react-native";
import useAppState from "./useAppState";

interface UseGrowAnimationProps {
  duration?: number;
  delay?: number;
  closeAfter?: number | null;
  initialScale?: number;
}

export const useGrowAnimation = ({
  duration = 500,
  delay = 0,
  closeAfter = 2000,
  initialScale = 0,
}: UseGrowAnimationProps = {}) => {
  const scale = useRef(new Animated.Value(initialScale)).current;
  const { isActive } = useAppState();

  useEffect(() => {
    if (!isActive && Platform.OS === "ios") {
      scale.stopAnimation();
    }
  }, [isActive]);

  useEffect(() => {
    // Start grow-in animation with easing
    Animated.timing(scale, {
      toValue: 1,
      duration,
      delay,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      if (closeAfter) {
        setTimeout(() => {
          Animated.timing(scale, {
            toValue: initialScale,
            duration,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }).start();
        }, closeAfter);
      }
    });

    return () => scale.stopAnimation();
  }, [scale, duration, delay, closeAfter, initialScale]);

  return {
    animatedStyle: { transform: [{ scale }] },
  };
};
