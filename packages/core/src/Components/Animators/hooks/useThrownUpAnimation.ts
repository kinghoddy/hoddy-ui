import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import useAppState from "./useAppState";

interface UseThrownUpAnimationProps {
  delay?: number;
  closeAfter?: number | null;
}

export const useThrownUpAnimation = ({
  delay = 0,
  closeAfter = null,
}: UseThrownUpAnimationProps = {}) => {
  const translateY = useSharedValue(600);
  const opacity = useSharedValue(0);
  const isUnmounting = useRef(false);
  const { isActive } = useAppState();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    if (!isActive && Platform.OS === "ios") {
      translateY.value = 600;
      opacity.value = 0;
      return;
    }

    // Animate up and fade in when component mounts
    translateY.value = withDelay(
      delay,
      withSpring(0, {
        velocity: 1,
        stiffness: 100,
        damping: 15,
      })
    );

    opacity.value = withDelay(delay, withTiming(1, { duration: 500 }));

    // Start timer to animate out after duration
    if (closeAfter) {
      translateY.value = withDelay(
        closeAfter,
        withSpring(800, {
          velocity: 1,
          stiffness: 200,
          damping: 20,
        })
      );
      opacity.value = withDelay(closeAfter, withTiming(0, { duration: 500 }));
    }

    return () => {
      translateY.value = 600;
      opacity.value = 0;
      isUnmounting.current = true;
    };
  }, [translateY, opacity, delay, closeAfter, isActive]);

  return {
    animatedStyle,
  };
};
