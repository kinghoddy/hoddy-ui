import { useEffect, useRef } from "react";
import { Animated, Easing, Platform } from "react-native";
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
  const opacity = useRef(new Animated.Value(maxOpacity)).current;
  const { isActive } = useAppState();
  const blinkAnim = useRef<Animated.CompositeAnimation | null>(null);

  const startBlinking = () => {
    blinkAnim.current = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: minOpacity,
          duration: blinkDuration / 2,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: maxOpacity,
          duration: blinkDuration / 2,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    blinkAnim.current.start();
  };

  useEffect(() => {
    if (!isActive && Platform.OS === "ios") {
      opacity.stopAnimation();
    }
  }, [isActive]);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        startBlinking();
      }, delay);
      return () => {
        clearTimeout(timer);
        opacity.stopAnimation();
        blinkAnim.current?.stop();
      };
    } else {
      startBlinking();
    }

    return () => {
      opacity.stopAnimation();
      blinkAnim.current?.stop();
    };
  }, [delay, blinkDuration, minOpacity, maxOpacity]);

  return {
    animatedStyle: { opacity },
  };
};
