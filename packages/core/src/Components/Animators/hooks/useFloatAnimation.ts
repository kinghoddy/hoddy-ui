import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import useAppState from "./useAppState";

interface UseFloatAnimationProps {
  duration?: number;
  delay?: number;
  closeAfter?: number | null;
  closeDuration?: number;
  floatDistance?: number;
  floatDuration?: number;
}

export const useFloatAnimation = ({
  duration = 800,
  delay = 0,
  closeAfter = null,
  closeDuration = 600,
  floatDistance = 10,
  floatDuration = 1200,
}: UseFloatAnimationProps = {}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);
  const { isActive } = useAppState();
  const isFloating = useRef(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const startFloating = () => {
    if (!isFloating.current) {
      isFloating.current = true;
      translateY.value = withRepeat(
        withSequence(
          withTiming(-floatDistance, {
            duration: floatDuration / 2,
            easing: Easing.inOut(Easing.quad),
          }),
          withTiming(floatDistance, {
            duration: floatDuration,
            easing: Easing.inOut(Easing.quad),
          }),
          withTiming(0, {
            duration: floatDuration / 2,
            easing: Easing.inOut(Easing.quad),
          })
        ),
        -1,
        false
      );
    }
  };

  const stopFloating = () => {
    isFloating.current = false;
    translateY.value = withTiming(0, { duration: 200 });
  };

  useEffect(() => {
    if (!isActive && Platform.OS === "ios") {
      opacity.value = 0;
      translateY.value = 0;
      isFloating.current = false;
      return;
    }

    // Fade-in
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration }, () => {
        startFloating();

        if (closeAfter) {
          setTimeout(() => {
            stopFloating();
            opacity.value = withTiming(0, { duration: closeDuration });
          }, closeAfter);
        }
      })
    );

    return () => {
      opacity.value = 0;
      translateY.value = 0;
      isFloating.current = false;
    };
  }, [
    duration,
    delay,
    closeAfter,
    closeDuration,
    floatDistance,
    floatDuration,
    isActive,
  ]);

  return {
    animatedStyle,
  };
};
