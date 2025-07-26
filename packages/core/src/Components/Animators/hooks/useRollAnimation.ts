import { useEffect, useRef } from "react";
import { Animated, Easing, Platform } from "react-native";
import useAppState from "./useAppState";

interface UseRollAnimationProps {
  duration?: number;
  delay?: number;
  closeAfter?: number | null;
  initialTranslateY?: number;
  initialRotate?: string;
}

export const useRollAnimation = ({
  duration = 500,
  delay = 0,
  closeAfter = 2000,
  initialTranslateY = 100,
  initialRotate = "0deg",
}: UseRollAnimationProps = {}) => {
  const translateY = useRef(new Animated.Value(initialTranslateY)).current;
  const rotate = useRef(new Animated.Value(0.5)).current;
  const { isActive } = useAppState();

  useEffect(() => {
    if (!isActive && Platform.OS === "ios") {
      rotate.stopAnimation();
      translateY.stopAnimation();
    }
  }, [isActive]);

  useEffect(() => {
    // Start roll-in animation with easing
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0.5,
        duration,
        delay,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (closeAfter) {
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(translateY, {
              toValue: initialTranslateY,
              duration,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(rotate, {
              toValue: 0,
              duration,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
          ]).start();
        }, closeAfter);
      }
    });

    return () => {
      translateY.stopAnimation();
      rotate.stopAnimation();
    };
  }, [translateY, rotate, duration, delay, closeAfter, initialTranslateY]);

  // Interpolate the rotation value to degrees
  const rotateInterpolation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: [initialRotate, "360deg"],
  });

  return {
    animatedStyle: {
      transform: [{ translateY }, { rotate: rotateInterpolation }],
    },
  };
};
