import { ReactNode } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";

export type ThemeTypes = "dark" | "light";
export type ThemeModes = "dark" | "light" | "default";
export type colorTypes =
  | "primary"
  | "secondary"
  | "light"
  | "dark"
  | "info"
  | "warning"
  | "error"
  | "success"
  | "blue"
  | "textSecondary";

export type extraColorTypes = {
  dark?: {
    [key: string]: {
      main?: string;
      light?: string;
      dark?: string;
      text?: string;
    };
  };
  light?: {
    [key: string]: {
      main?: string;
      light?: string;
      dark?: string;
      text?: string;
    };
  };
};

export interface ThemeActionTypes {
  type: ThemeModes;
  payload?: ThemeTypes;
}
export interface ThemeState {
  value: ThemeTypes;
  mode: ThemeModes;
}

export interface ThemeContext {
  themeState: ThemeState;
  themeDispatch?: any;
}
export interface ThemeProviderProps {
  children: ReactNode;
}
export interface AlertXProps {
  type: "info" | "warning" | "success" | "error";
  variant?: "contained" | "outlined";
  title?: string;
  gutterBottom?: number;
  body: string;
  style?: ViewStyle;
}

// Component Types

export interface AvatarProps {
  color?: colorTypes;
  label?: string;
  variant?: "outlined" | "contained";
  source?: any;
  size?: number;
  style?: ViewStyle;
}
export interface AnimatorProps {
  style?: ViewStyle;
  duration?: number;
  children: ReactNode;
  delay?: number;
  animationType?: "easeInEaseOut" | "linear" | "spring";
  type?: "fade" | "slideInLeft" | "slideInRight" | "slideInUp" | "slideInDown";
}
export interface ButtonProps {
  color?: colorTypes;
  variant?: "text" | "outlined" | "contained";
  gutterBottom?: number;
  elevation?: number;
  onPress?: () => void;
  disabled?: boolean;
  title?: string;
  loading?: boolean;
  size?: "large" | "normal" | "small";
  rounded?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
  translucent?: "dark" | undefined;
  start?: ReactNode;
  end?: ReactNode;
}

export interface CheckboxProps {
  color?: colorTypes;
  label?: ReactNode;
  size?: number;
  checked?: boolean;
  style?: ViewStyle;
  onChange?: () => void;
}
export interface FlashMessageProps {
  message: string;
  title?: string;
  actions?: Array<{ title: string; onPress?: () => void }>;
  duration?: number;
  type?: "success" | "warning" | "error";
}
export interface LinkButtonProps {
  title: string;
  style?: TextStyle & ViewStyle;
  color?: colorTypes;
  fontSize?: number;
  fontWeight?: string;
  disabled?: boolean;
  onPress?: () => void;
}
export interface IconButtonProps {
  style?: TextStyle;
  color?: colorTypes;
  fontSize?: number;
  disabled?: boolean;
  onPress?: () => void;
  icon: any;
  elevation?: number;
  bg?: boolean;
  size?: number;
  containerStyles?: ViewStyle;
  iconType?: "material" | "ion";
}

export type locatorLocation = {
  description: string;
  longitude: number;
  latitude: number;
};
export type LocatorInputProps = {
  onBlur?: () => void;
  onFocus?: () => void;
  clear?: () => void;
  locateMe?: () => void;
  value?: string;
  onChangeText: (text: string) => void;
};
export interface LocatorProps {
  variant?: "contained" | "outlined";
  onLocationSelected: (location: locatorLocation | null) => void;
  label?: string;
  error?: string;
  float?: boolean;
  location?: locatorLocation | null;
  gutterBottom?: number;
  helperText?: string;
  renderInput?: (props: LocatorInputProps) => ReactNode;
  country?: string;
}
export interface ListProps {
  style?: ViewStyle;
  children: ReactNode;
}
export interface ListItemTextProps {
  primary: string;
  divider?: boolean;
  primaryProps?: TypographyProps;
  secondaryProps?: TypographyProps;
  secondary?: string;
  style?: ViewStyle;
}
export interface ListItemProps {
  link?: boolean;
  divider?: boolean;
  onPress?: () => void;
  index?: number;
  style?: ViewStyle;
  children: ReactNode;
}
export interface FormWrapperProps {
  children: ReactNode;
  behavior?: "position" | "height" | "padding";
  contentContainerStyle?: ViewStyle;
  mode?: "scroll" | "static";
  keyboardVerticalOffset?: number;
  style?: ViewStyle;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}
export interface GridItemProps {
  children: ReactNode;
  col?: number;
  alignItems?: "center" | "flex-start" | "flex-end";
  spacing?: number;
  style?: ViewStyle;
}
export interface GridProps {
  children: ReactNode;
  spacing?: number;
  style?: ViewStyle;
}
export interface PopupProps {
  title?: string;
  sheet?: number | boolean;
  bare?: boolean;
  children: ReactNode;
  open: boolean;
  onClose?: () => void;
}

export interface SpinnerProps {
  label?: string;
  size?: "large" | "small";
  color?: colorTypes;
  fullscreen?: boolean;
  style?: ViewStyle;
}

export interface TextFieldProps extends TextInputProps {
  label?: string;
  variant?: "outlined" | "text" | "contained";
  color?: colorTypes;
  size?: "small" | "normal" | "large";
  type?: "email" | "tel" | "password" | "text" | "number" | "search";
  helperText?: string;
  value: any;
  start?: ReactNode;
  rounded?: boolean;
  error?: string | string[];
  disabled?: boolean;
  style?: ViewStyle;
  inputStyles?: any;
  gutterBottom?: number;
  end?: ReactNode;
  options?: {
    start?: ReactNode;
    secondary?: string;
    value: string | number;
    label: string;
  }[];
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface TypographyProps {
  children: ReactNode;
  color?: colorTypes;
  style?: TextStyle | ViewStyle;
  textCase?: "capitalize" | "uppercase" | "lowercase" | null;
  variant?:
    | "caption"
    | "body1"
    | "body2"
    | "h6"
    | "h5"
    | "h4"
    | "h3"
    | "h2"
    | "h1";
  align?: "center" | "left" | "right";
  gutterBottom?: number;
  fontWeight?: 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}

export interface SafeAreaViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

export interface SelectMenuProps {
  open: boolean;
  onClose: () => void;
  value: any;
  options: { secondary?: string; value: any; label: string }[];
  onChange: (value: string) => void;
  disableAutoClose?: boolean;
  label?: string;
  secondary?: string;
  helperText?: string;
}

export interface OTPInputProps {
  length?: number;
  onChange: (value: string) => void;
  value: string;
  variant?: "outlined" | "text" | "contained";
  spacing?: number;
  size?: number;
}

export interface RatingStarsProps {
  rating: number;
  size: number;
}

export interface RatingInputProps {
  rating?: number;
  size?: number;
  onSubmit?: (data: { rating: number; review: string }) => Promise<void>;
}
