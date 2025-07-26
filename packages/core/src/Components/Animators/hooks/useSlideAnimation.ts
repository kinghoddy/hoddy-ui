import { useEffect } from "react";
import { Dimensions, Platform } from "react-native";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import useAppState from "./useAppState";

const { width, height } = Dimensions.get("window");

interface UseSlideAnimationProps {
  duration?: number;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  closeAfter?: number | null;
  initialValue?: number;
}

const getInitialPosition = (direction: string) => {
  switch (direction) {
    case "up":
      return height;
    case "down":
      return -height;
    case "left":
      return width;
    case "right":
      return -width;
    default:
      return 0;
  }
};

export const useSlideAnimation = ({
  duration = 1000,
  delay = 0,
  direction = "up",
  closeAfter,
  initialValue,
}: UseSlideAnimationProps = {}) => {
  const translateValue = useSharedValue(0);
  const { isActive } = useAppState();

  const animatedStyle = useAnimatedStyle(() => {
    const slideStyle =
      direction === "up" || direction === "down"
        ? { transform: [{ translateY: translateValue.value }] }
        : { transform: [{ translateX: translateValue.value }] };

    return slideStyle;
  });

  useEffect(() => {
    if (!isActive && Platform.OS === "ios") {
      const initialPosition = initialValue || getInitialPosition(direction);
      translateValue.value = initialPosition;
      return;
    }

    const initialPosition = initialValue || getInitialPosition(direction);
    translateValue.value = initialPosition;

    // Slide-in animation with ease-out effect
    translateValue.value = withDelay(
      delay,
      withTiming(0, {
        duration,
        easing: Easing.out(Easing.ease),
      })
    );

    if (closeAfter) {
      const timer = setTimeout(() => {
        translateValue.value = withTiming(initialPosition, {
          duration,
          easing: Easing.out(Easing.ease),
        });
      }, closeAfter + duration + delay);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [
    translateValue,
    duration,
    delay,
    direction,
    closeAfter,
    initialValue,
    isActive,
  ]);

  return {
    animatedStyle,
  };
};
