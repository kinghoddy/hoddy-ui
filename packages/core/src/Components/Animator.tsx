import { useFocusEffect } from "@react-navigation/native";
import React, { FC, useCallback, useState } from "react";
import { LayoutAnimation, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { AnimatorProps } from "../types";

export const Animator: FC<AnimatorProps> = ({
  style = {},
  duration = 500,
  children,
  delay = 100,
  animationType = "easeInEaseOut",
  type = "fade",
}) => {
  const [play, setPlay] = useState(false);
  const toggleAnimation = () => {
    setPlay(false);

    setTimeout(() => {
      LayoutAnimation.configureNext({
        ...LayoutAnimation.Presets[animationType],
        duration,
      });
      setPlay(true);
    }, delay);
  };
  const styles = ScaledSheet.create({
    root: {
      opacity: play ? 1 : 0,
      left: type === "slideInLeft" ? (!play ? -200 : 0) : undefined,
      right: type === "slideInRight" ? (!play ? -200 : 0) : undefined,
      bottom: type === "slideInUp" ? (!play ? -100 : 0) : undefined,
      top: type === "slideInDown" ? (!play ? -100 : 0) : undefined,
      ...style,
    },
  });
  useFocusEffect(
    useCallback(() => {
      toggleAnimation();
    }, [])
  );
  return <View style={styles.root}>{play && children}</View>;
};
