import { Dimensions, Platform } from "react-native";
import {
  moderateScale as baseModerateScale,
  moderateVerticalScale as baseModerateVerticalScale,
  scale as baseScale,
  verticalScale as baseVerticalScale,
  ScaledSheet as SizeMattersScaledSheet,
} from "react-native-size-matters";
import scaledSheetCreator from "react-native-size-matters/lib/ScaledSheet";
import { getConfig } from "../config/KeyManager";

const DEFAULT_TABLET_SCALE_FACTOR = 0.2;

type ScalerFn = (size: number, factor?: number) => number;

export function isTablet(): boolean {
  if (Platform.OS === "ios") {
    return Platform.isPad;
  }
  if (Platform.OS === "android") {
    const { width, height } = Dimensions.get("screen");
    const smallestDimension = Math.min(width, height);
    return smallestDimension >= 600;
  }
  return false;
}

/** Moderate-scale factor from `initialize({ tabletScaleFactor })`, used on tablets only. */
export function getTabletScaleFactor(): number {
  return getConfig().TABLET_SCALE_FACTOR ?? DEFAULT_TABLET_SCALE_FACTOR;
}

function resolveFactor(factor?: number): number | undefined {
  if (isTablet()) {
    return getTabletScaleFactor();
  }
  return factor;
}

export const moderateScale: ScalerFn = (size, factor) =>
  baseModerateScale(size, resolveFactor(factor));

export const moderateVerticalScale: ScalerFn = (size, factor) =>
  baseModerateVerticalScale(size, resolveFactor(factor));

/** On tablets uses `moderateScale` with the tablet factor; otherwise plain `scale`. */
export const scale: ScalerFn = (size, factor) => {
  if (isTablet()) {
    return baseModerateScale(size, getTabletScaleFactor());
  }
  return baseScale(size);
};

/** On tablets uses `moderateVerticalScale` with the tablet factor; otherwise plain `verticalScale`. */
export const verticalScale: ScalerFn = (size, factor) => {
  if (isTablet()) {
    return baseModerateVerticalScale(size, getTabletScaleFactor());
  }
  return baseVerticalScale(size);
};

export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;
export const mvs = moderateVerticalScale;

export const ScaledSheet = scaledSheetCreator(
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
) as typeof SizeMattersScaledSheet;
