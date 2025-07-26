import { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, Platform } from "react-native";
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
  const translateValue = useRef(new Animated.Value(0)).current;
  const { isActive } = useAppState();

  useEffect(() => {
    if (!isActive && Platform.OS === "ios") {
      translateValue.stopAnimation();
    }
  }, [isActive]);

  useEffect(() => {
    const initialPosition = initialValue || getInitialPosition(direction);
    translateValue.setValue(initialPosition);

    // Slide-in animation with ease-out effect
    Animated.timing(translateValue, {
      toValue: 0,
      duration,
      delay,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    if (closeAfter) {
      const timer = setTimeout(() => {
        Animated.timing(translateValue, {
          toValue: initialPosition,
          duration,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      }, closeAfter + duration + delay);

      return () => {
        translateValue.stopAnimation();
        clearTimeout(timer);
      };
    }

    return () => {
      translateValue.stopAnimation();
    };
  }, [translateValue, duration, delay, direction, closeAfter]);

  const slideStyle =
    direction === "up" || direction === "down"
      ? { transform: [{ translateY: translateValue }] }
      : { transform: [{ translateX: translateValue }] };

  return {
    animatedStyle: slideStyle,
  };
};
