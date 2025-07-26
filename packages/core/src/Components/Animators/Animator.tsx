import React, { FC, ReactNode } from "react";
import { Animated, ViewStyle } from "react-native";
import { useBlinkAnimation } from "./hooks/useBlinkAnimation";
import { useFadeAnimation } from "./hooks/useFadeAnimation";
import { useFloatAnimation } from "./hooks/useFloatAnimation";
import { useGrowAnimation } from "./hooks/useGrowAnimation";
import { useRollAnimation } from "./hooks/useRollAnimation";
import { useSlideAnimation } from "./hooks/useSlideAnimation";
import { useThrownUpAnimation } from "./hooks/useThrownUpAnimation";

export type AnimationType =
  | "fade"
  | "grow"
  | "slide"
  | "blink"
  | "float"
  | "roll"
  | "thrownup";

interface AnimatorProps {
  children: ReactNode;
  type: AnimationType;
  duration?: number;
  delay?: number;
  closeAfter?: number | null;
  style?: ViewStyle;

  // Slide-specific props
  direction?: "up" | "down" | "left" | "right";
  initialValue?: number;

  // Grow-specific props
  initialScale?: number;

  // Blink-specific props
  blinkDuration?: number;
  minOpacity?: number;
  maxOpacity?: number;

  // Float-specific props
  closeDuration?: number;
  floatDistance?: number;
  floatDuration?: number;

  // Roll-specific props
  initialTranslateY?: number;
  initialRotate?: string;
}

/**
 * Unified Animator component that handles multiple animation types with generic props.
 *
 * @example
 * // Fade animation
 * <Animator type="fade" duration={1000} closeAfter={3000}>
 *   <Text>This will fade in and out</Text>
 * </Animator>
 *
 * @example
 * // Slide animation
 * <Animator type="slide" direction="up" duration={800} closeAfter={2000}>
 *   <View>This will slide up from bottom</View>
 * </Animator>
 *
 * @example
 * // Grow animation
 * <Animator type="grow" initialScale={0.5} duration={600}>
 *   <Button>This will grow from 50% scale</Button>
 * </Animator>
 *
 * @example
 * // Blink animation (continuous)
 * <Animator type="blink" blinkDuration={1000} minOpacity={0.3}>
 *   <Icon>This will blink continuously</Icon>
 * </Animator>
 */
const Animator: FC<AnimatorProps> = ({
  children,
  type,
  duration,
  delay,
  closeAfter,
  style = {},

  // Slide props
  direction,
  initialValue,

  // Grow props
  initialScale,

  // Blink props
  blinkDuration,
  minOpacity,
  maxOpacity,

  // Float props
  closeDuration,
  floatDistance,
  floatDuration,

  // Roll props
  initialTranslateY,
  initialRotate,
}) => {
  // Get animation style based on type
  const getAnimationStyle = () => {
    switch (type) {
      case "fade":
        return useFadeAnimation({ duration, delay, closeAfter });

      case "grow":
        return useGrowAnimation({ duration, delay, closeAfter, initialScale });

      case "slide":
        return useSlideAnimation({
          duration,
          delay,
          direction,
          closeAfter,
          initialValue,
        });

      case "blink":
        return useBlinkAnimation({
          delay,
          blinkDuration,
          minOpacity,
          maxOpacity,
        });

      case "float":
        return useFloatAnimation({
          duration,
          delay,
          closeAfter,
          closeDuration,
          floatDistance,
          floatDuration,
        });

      case "roll":
        return useRollAnimation({
          duration,
          delay,
          closeAfter,
          initialTranslateY,
          initialRotate,
        });

      case "thrownup":
        return useThrownUpAnimation({ delay, closeAfter });

      default:
        return { animatedStyle: {} };
    }
  };

  const { animatedStyle } = getAnimationStyle();

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

export default Animator;
