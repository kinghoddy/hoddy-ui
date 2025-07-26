import { useEffect, useRef } from "react";
import { Animated, Easing, Platform } from "react-native";
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
  closeAfter = 2000,
  closeDuration = 600,
  floatDistance = 10,
  floatDuration = 1200,
}: UseFloatAnimationProps = {}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const { isActive } = useAppState();
  const floatAnim = useRef<Animated.CompositeAnimation | null>(null);

  const startFloating = () => {
    floatAnim.current = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -floatDistance,
          duration: floatDuration / 2,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: floatDistance,
          duration: floatDuration,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: floatDuration / 2,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    floatAnim.current.start();
  };

  useEffect(() => {
    if (!isActive && Platform.OS === "ios") {
      opacity.stopAnimation();
      translateY.stopAnimation();
    }
  }, [isActive]);

  useEffect(() => {
    // Fade-in
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start(() => {
      startFloating();

      if (closeAfter) {
        setTimeout(() => {
          floatAnim.current?.stop();

          Animated.timing(opacity, {
            toValue: 0,
            duration: closeDuration,
            useNativeDriver: true,
          }).start();
        }, closeAfter);
      }
    });

    return () => {
      opacity.stopAnimation();
      translateY.stopAnimation();
      floatAnim.current?.stop();
    };
  }, [
    duration,
    delay,
    closeAfter,
    closeDuration,
    floatDistance,
    floatDuration,
  ]);

  return {
    animatedStyle: {
      opacity,
      transform: [{ translateY }],
    },
  };
};
