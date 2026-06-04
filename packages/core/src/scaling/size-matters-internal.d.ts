declare module "react-native-size-matters/lib/ScaledSheet" {
  type ScalerFn = (size: number, factor?: number) => number;

  export default function scaledSheetCreator(
    scale: ScalerFn,
    verticalScale: ScalerFn,
    moderateScale: ScalerFn,
    moderateVerticalScale: ScalerFn,
  ): unknown;
}
