import { useEffect } from "react";
import { Platform } from "react-native";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import useAppState from "./useAppState";

interface UseBlinkAnimationProps {
  delay?: number;
  blinkDuration?: number;
  minOpacity?: number;
  maxOpacity?: number;
}

export const useBlinkAnimation = ({
  delay = 0,
  blinkDuration = 2000,
  minOpacity = 0.5,
  maxOpacity = 1,
}: UseBlinkAnimationProps = {}) => {
  const opacity = useSharedValue(maxOpacity);
  const { isActive } = useAppState();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const startBlinking = () => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(minOpacity, {
          duration: blinkDuration / 2,
          easing: Easing.inOut(Easing.quad),
        }),
        withTiming(maxOpacity, {
          duration: blinkDuration / 2,
          easing: Easing.inOut(Easing.quad),
        })
      ),
      -1,
      false
    );
  };

  useEffect(() => {
    if (!isActive && Platform.OS === "ios") {
      opacity.value = maxOpacity;
      return;
    }

    if (delay > 0) {
      const timer = setTimeout(() => {
        startBlinking();
      }, delay);
      return () => {
        clearTimeout(timer);
        opacity.value = maxOpacity;
      };
    } else {
      startBlinking();
    }

    return () => {
      opacity.value = maxOpacity;
    };
  }, [delay, blinkDuration, minOpacity, maxOpacity, isActive]);

  return {
    animatedStyle,
  };
};
