import { useEffect, useRef } from "react";
import { Animated, Platform } from "react-native";
import useAppState from "./useAppState";

interface UseThrownUpAnimationProps {
  delay?: number;
  closeAfter?: number | null;
}

export const useThrownUpAnimation = ({
  delay = 0,
  closeAfter = 3000,
}: UseThrownUpAnimationProps = {}) => {
  const translateY = useRef(new Animated.Value(600)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const isUnmounting = useRef(false);
  const { isActive } = useAppState();

  useEffect(() => {
    if (!isActive && Platform.OS === "ios") {
      translateY.stopAnimation();
      opacity.stopAnimation();
    }
  }, [isActive]);

  useEffect(() => {
    // Animate up and fade in when component mounts
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        velocity: 1,
        tension: 0.001,
        friction: 2,
        useNativeDriver: true,
        delay,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        delay,
      }),
    ]).start();

    // Start timer to animate out after duration
    let timer: NodeJS.Timeout | null = null;
    if (closeAfter) {
      timer = setTimeout(() => {
        if (!isUnmounting.current) {
          Animated.parallel([
            Animated.spring(translateY, {
              toValue: 800,
              velocity: 1,
              tension: 10,
              friction: 7,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]).start();
        }
      }, closeAfter);
    }

    return () => {
      if (timer) clearTimeout(timer);
      translateY.stopAnimation();
      opacity.stopAnimation();
      isUnmounting.current = true;
    };
  }, [translateY, opacity, delay, closeAfter]);

  return {
    animatedStyle: {
      transform: [{ translateY }],
      opacity,
    },
  };
};
