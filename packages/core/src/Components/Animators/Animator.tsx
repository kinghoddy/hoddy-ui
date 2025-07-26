import React, { FC } from "react";
import Animated from "react-native-reanimated";
import { AnimatorProps } from "../../types";
import { useBlinkAnimation } from "./hooks/useBlinkAnimation";
import { useFadeAnimation } from "./hooks/useFadeAnimation";
import { useFloatAnimation } from "./hooks/useFloatAnimation";
import { useGrowAnimation } from "./hooks/useGrowAnimation";
import { useRollAnimation } from "./hooks/useRollAnimation";
import { useSlideAnimation } from "./hooks/useSlideAnimation";
import { useThrownUpAnimation } from "./hooks/useThrownUpAnimation";

/**
 * Unified Animator component that handles multiple animation types with type-safe props.
 *
 * Each animation type only accepts its relevant props, ensuring type safety and better developer experience.
 *
 * @example
 * // Fade animation - only accepts base props
 * <Animator type="fade" duration={1000} closeAfter={3000}>
 *   <Text>This will fade in and out</Text>
 * </Animator>
 *
 * @example
 * // Slide animation - only accepts direction and initialValue props
 * <Animator type="slide" direction="up" duration={800} closeAfter={2000}>
 *   <View>This will slide up from bottom</View>
 * </Animator>
 *
 * @example
 * // Grow animation - only accepts initialScale prop
 * <Animator type="grow" initialScale={0.5} duration={600}>
 *   <Button>This will grow from 50% scale</Button>
 * </Animator>
 *
 * @example
 * // Blink animation - only accepts blink-specific props
 * <Animator type="blink" blinkDuration={1000} minOpacity={0.3}>
 *   <Icon>This will blink continuously</Icon>
 * </Animator>
 *
 * @example
 * // TypeScript will show errors for invalid prop combinations:
 * // ❌ This will cause a TypeScript error:
 * // <Animator type="fade" direction="up"> // direction is not valid for fade
 * //
 * // ✅ This is correct:
 * // <Animator type="slide" direction="up">
 */
export const Animator: FC<AnimatorProps> = (props) => {
  const { children, type, duration, delay, closeAfter, style = {} } = props;

  // Get animation style based on type
  const getAnimationStyle = () => {
    switch (type) {
      case "fade":
        return useFadeAnimation({ duration, delay, closeAfter });

      case "grow":
        return useGrowAnimation({
          duration,
          delay,
          closeAfter,
          initialScale: props.initialScale,
        });

      case "slide":
        return useSlideAnimation({
          duration,
          delay,
          direction: props.direction,
          closeAfter,
          initialValue: props.initialValue,
        });

      case "blink":
        return useBlinkAnimation({
          delay,
          blinkDuration: props.blinkDuration,
          minOpacity: props.minOpacity,
          maxOpacity: props.maxOpacity,
        });

      case "float":
        return useFloatAnimation({
          duration,
          delay,
          closeAfter,
          closeDuration: props.closeDuration,
          floatDistance: props.floatDistance,
          floatDuration: props.floatDuration,
        });

      case "roll":
        return useRollAnimation({
          duration,
          delay,
          closeAfter,
          initialTranslateY: props.initialTranslateY,
          initialRotate: props.initialRotate,
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
