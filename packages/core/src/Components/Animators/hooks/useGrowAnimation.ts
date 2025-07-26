import { useEffect } from "react";
import { Platform } from "react-native";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
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
  closeAfter = null,
  initialScale = 0,
}: UseGrowAnimationProps = {}) => {
  const scale = useSharedValue(initialScale);
  const { isActive } = useAppState();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    if (!isActive && Platform.OS === "ios") {
      scale.value = initialScale;
      return;
    }

    // Start grow-in animation with easing
    scale.value = withDelay(
      delay,
      withTiming(
        1,
        {
          duration,
          easing: Easing.out(Easing.ease),
        },
        () => {
          if (closeAfter) {
            setTimeout(() => {
              scale.value = withTiming(initialScale, {
                duration,
                easing: Easing.out(Easing.ease),
              });
            }, closeAfter);
          }
        }
      )
    );
  }, [scale, duration, delay, closeAfter, initialScale, isActive]);

  return {
    animatedStyle,
  };
};
