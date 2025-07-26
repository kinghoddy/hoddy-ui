import { useEffect } from "react";
import { Platform } from "react-native";
import {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
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
  closeAfter = null,
  initialTranslateY = 100,
  initialRotate = "0deg",
}: UseRollAnimationProps = {}) => {
  const translateY = useSharedValue(initialTranslateY);
  const rotate = useSharedValue(0);
  const { isActive } = useAppState();

  const animatedStyle = useAnimatedStyle(() => {
    // Interpolate rotation from 0-1 to initial rotation to 360deg
    const rotateInterpolated = interpolate(
      rotate.value,
      [0, 1],
      [parseFloat(initialRotate.replace("deg", "")), 360]
    );

    return {
      transform: [
        { translateY: translateY.value },
        { rotate: `${rotateInterpolated}deg` },
      ],
    };
  });

  useEffect(() => {
    if (!isActive && Platform.OS === "ios") {
      translateY.value = initialTranslateY;
      rotate.value = 0;
      return;
    }

    // Start roll-in animation with easing (parallel animations)
    translateY.value = withDelay(
      delay,
      withTiming(0, {
        duration,
        easing: Easing.out(Easing.ease),
      })
    );

    rotate.value = withDelay(
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
              translateY.value = withTiming(initialTranslateY, {
                duration,
                easing: Easing.out(Easing.ease),
              });
              rotate.value = withTiming(0, {
                duration,
                easing: Easing.out(Easing.ease),
              });
            }, closeAfter);
          }
        }
      )
    );
  }, [
    translateY,
    rotate,
    duration,
    delay,
    closeAfter,
    initialTranslateY,
    initialRotate,
    isActive,
  ]);

  return {
    animatedStyle,
  };
};
