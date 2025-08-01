# @hoddy-ui/core

**The complete UI component library for React Native and Expo applications**

A comprehensive, production-ready UI component library that follows Material Design principles with a modern twist. Built with TypeScript and optimized for React Native and Expo applications.

## ✨ Features

- 🎨 **20+ Production-Ready Components** - From basic buttons to complex forms
- 🌗 **Dark Mode Support** - Automatic theme switching with system preference detection
- 🔧 **TypeScript First** - Full type safety and IntelliSense support
- ⚡ **Performance Optimized** - Minimal bundle size with tree shaking
- 🎯 **Accessibility Ready** - WCAG compliant components
- 🔌 **Highly Customizable** - Extensive theming and configuration options
- 📱 **Cross Platform** - Works seamlessly on iOS and Android

## 📦 Installation

```bash
npm install @hoddy-ui/core
# or
yarn add @hoddy-ui/core
```

### Peer Dependencies

Install the required peer dependencies:

```bash
npm install @expo/vector-icons @react-native-async-storage/async-storage @react-navigation/native expo-navigation-bar expo-system-ui react-native-safe-area-context react-native-size-matters react-native-reanimated
```

Or with yarn:

```bash
yarn add @expo/vector-icons @react-native-async-storage/async-storage @react-navigation/native expo-navigation-bar expo-system-ui react-native-safe-area-context react-native-size-matters react-native-reanimated
```

**Important**: Make sure to follow the [react-native-reanimated installation guide](https://docs.swmansion.com/react-native-reanimated/docs/3.x/fundamentals/getting-started) for platform-specific setup as it requires additional configuration for iOS and Android.

## 🚀 Quick Start

### Basic Setup

1. **Initialize the library** (optional but recommended):

```tsx
import { initialize } from "@hoddy-ui/core";

initialize({
  // Google Maps API key for Locator component
  googleMapApiKey: "your-google-maps-api-key",

  // Edge-to-edge display (affects Android navigation bar styling)
  edgeToEdge: false,

  // Custom colors
  colors: {
    primary: {
      main: "#6366f1",
      light: "#818cf8",
      dark: "#4f46e5",
    },
  },

  // Typography settings
  typography: {
    fontFamily: "Inter-Regular",
    fontWeights: {
      400: "Inter-Regular",
      500: "Inter-Medium",
      600: "Inter-SemiBold",
      700: "Inter-Bold",
    },
  },
});
```

2. **Wrap your app with the theme provider**:

```tsx
import React from "react";
import { UIThemeProvider } from "@hoddy-ui/core";
import App from "./App";

export default function Root() {
  return (
    <UIThemeProvider>
      <App />
    </UIThemeProvider>
  );
}
```

3. **Start using components**:

```tsx
import React from "react";
import { View } from "react-native";
import {
  Typography,
  Button,
  TextField,
  Animator,
  useColors,
  useFadeAnimation,
} from "@hoddy-ui/core";

export default function HomeScreen() {
  const colors = useColors();

  return (
    <View style={{ padding: 20, backgroundColor: colors.white[1] }}>
      <Animator type="fade" duration={1000}>
        <Typography variant="h4" color="primary" gutterBottom={20}>
          Welcome to Hoddy UI!
        </Typography>
      </Animator>

      <Animator type="slide" direction="up" delay={200}>
        <TextField
          label="Email Address"
          variant="outlined"
          keyboardType="email-address"
          gutterBottom={16}
        />
      </Animator>

      <Animator type="grow" delay={400}>
        <Button
          title="Get Started"
          variant="contained"
          color="primary"
          onPress={() => console.log("Button pressed!")}
        />
      </Animator>
    </View>
  );
}
```

## ⚙️ Configuration

### Global Configuration

Use the `initialize` function to configure the library globally:

```tsx
import { initialize } from "@hoddy-ui/core";

initialize({
  // Google Maps API key for map components
  googleMapApiKey?: string;

  // Custom color palette overrides
  colors?: {
    primary?: { main: string; light?: string; dark?: string };
    secondary?: { main: string; light?: string; dark?: string };
    // ... and more color options
  };

  // Enable edge-to-edge display mode
  edgeToEdge?: boolean;

  // Typography settings
  typography?: {
    // Primary font family
    fontFamily?: string;

    // Font family mappings for each weight (Android support)
    fontWeights?: {
      100?: string;
      200?: string;
      300?: string;
      400?: string;
      500?: string;
      600?: string;
      700?: string;
      800?: string;
      900?: string;
    };
  };
});
```

### Configuration Example

```tsx
initialize({
  googleMapApiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxx",
  edgeToEdge: true,
  colors: {
    primary: "#007AFF",
    secondary: "#34C759",
  },
  typography: {
    fontFamily: "Inter",
    fontWeights: {
      400: "Inter-Regular",
      500: "Inter-Medium",
      600: "Inter-SemiBold",
      700: "Inter-Bold",
    },
  },
});
```

**Note:** The `fontWeights` property is particularly useful for Android devices where different font weights require separate font family files. This allows you to map each weight (100-900) to its corresponding font family name.

### Theme Configuration

The theme system automatically detects system preferences and can be controlled programmatically:

```tsx
import { useTheme } from "@hoddy-ui/core";

function ThemeToggle() {
  const { themeState, themeDispatch } = useTheme();

  const toggleTheme = () => {
    themeDispatch({
      type: themeState.mode === "dark" ? "light" : "dark",
    });
  };

  return (
    <Button
      title={`Switch to ${themeState.mode === "dark" ? "Light" : "Dark"} Mode`}
      onPress={toggleTheme}
    />
  );
}
```

## 🎨 Theming System

### Using Hooks

Access theme colors and state throughout your app:

```tsx
import { useColors, useTheme } from "@hoddy-ui/core";

function MyComponent() {
  const colors = useColors();
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.white[1],
        borderColor: colors.primary.main,
      }}
    >
      <Typography color={theme === "dark" ? "white" : "dark"}>
        Current theme: {theme}
      </Typography>
    </View>
  );
}
```

### Color Palette

The library includes a comprehensive color system:

```tsx
const colors = {
  // Primary colors
  primary: { main: "#007AFF", light: "#5AC8FA", dark: "#0051D5" },
  secondary: { main: "#FF3B30", light: "#FF6B6B", dark: "#D70015" },

  // Neutral colors
  white: ["#FFFFFF", "#F8F9FA", "#E9ECEF"],
  black: ["#000000", "#212529", "#495057"],

  // Semantic colors
  success: { main: "#28A745", light: "#34CE57", dark: "#1E7E34" },
  error: { main: "#DC3545", light: "#E74C3C", dark: "#C82333" },
  warning: { main: "#FFC107", light: "#FFD54F", dark: "#FF8F00" },

  // Utility colors
  textPrimary: { main: "#212529" },
  textSecondary: { main: "#6C757D" },
  divider: { main: "#DEE2E6" },
};
```

## 🧩 Components

### Layout & Structure

- **`SafeAreaView`** - Safe area wrapper for different devices
- **`Grid`** & **`GridItem`** - Flexible grid layout system
- **`FormWrapper`** - Form container with validation support

### Navigation & Status

- **`AdaptiveStatusBar`** - Theme-aware status bar
- Navigation utilities via hooks

### Typography

- **`Typography`** - Comprehensive text component with variants (h1-h6, body1-body2, caption)

### Form Components

- **`TextField`** - Material Design text input with variants
- **`TextField2`** - Alternative text field design
- **`OTPInput`** - One-Time Password input with auto-advance and paste support
- **`Locator`** - Location picker with Google Maps integration

### Interactive Elements

- **`Button`** - Primary action buttons with variants
- **`IconButton`** - Icon-only buttons
- **`LinkButton`** - Text-based link buttons

### Feedback & Communication

- **`FlashMessage`** - Toast notifications and alerts
- **`AlertX`** - Customizable alert dialogs
- **`Spinner`** - Loading indicators

### Data Display

- **`Avatar`** - User profile images and placeholders
- **`List`**, **`ListItem`**, **`ListItemText`** - List components

### Overlays & Modals

- **`Popup`** - Modal dialogs and bottom sheets

### Animation

- **`Animator`** - Layout animations and transitions

## 📖 Component API Reference

### Typography

A versatile text component supporting multiple variants and styling options.

**Props:**

| Prop           | Type                                                                              | Default   | Description                   |
| -------------- | --------------------------------------------------------------------------------- | --------- | ----------------------------- |
| `variant`      | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "body1" \| "body2" \| "caption"` | `"body1"` | Text style variant            |
| `color`        | `string`                                                                          | `"dark"`  | Text color from theme palette |
| `align`        | `"left" \| "center" \| "right"`                                                   | `"left"`  | Text alignment                |
| `gutterBottom` | `number`                                                                          | `0`       | Bottom margin in pixels       |
| `fontWeight`   | `number`                                                                          | `400`     | Font weight                   |
| `textCase`     | `"uppercase" \| "lowercase" \| "capitalize"`                                      | `null`    | Text transformation           |

**Example:**

```tsx
<Typography variant="h4" color="primary" gutterBottom={20}>
  Welcome to Hoddy UI
</Typography>
```

### Button

A comprehensive button component with multiple variants and states.

**Props:**

| Prop       | Type                                  | Default       | Description                |
| ---------- | ------------------------------------- | ------------- | -------------------------- |
| `title`    | `string`                              | -             | Button text                |
| `variant`  | `"contained" \| "outlined" \| "text"` | `"contained"` | Button variant             |
| `color`    | `string`                              | `"primary"`   | Button color from theme    |
| `size`     | `"small" \| "medium" \| "large"`      | `"medium"`    | Button size                |
| `disabled` | `boolean`                             | `false`       | Disabled state             |
| `loading`  | `boolean`                             | `false`       | Loading state with spinner |
| `onPress`  | `() => void`                          | -             | Press handler              |
| `start`    | `ReactNode`                           | -             | Leading icon/element       |
| `end`      | `ReactNode`                           | -             | Trailing icon/element      |

**Example:**

```tsx
<Button
  title="Submit"
  variant="contained"
  color="primary"
  loading={isLoading}
  onPress={handleSubmit}
/>
```

### IconButton

A button component that displays only an icon.

**Props:**

| Prop              | Type                  | Default      | Description               |
| ----------------- | --------------------- | ------------ | ------------------------- |
| `icon`            | `string`              | -            | Icon name                 |
| `iconType`        | `"material" \| "ion"` | `"material"` | Icon library to use       |
| `size`            | `number`              | `24`         | Icon size in pixels       |
| `color`           | `string`              | `"dark"`     | Icon color from theme     |
| `bg`              | `boolean`             | `false`      | Show background circle    |
| `elevation`       | `number`              | `0`          | Shadow elevation          |
| `disabled`        | `boolean`             | `false`      | Disabled state            |
| `onPress`         | `() => void`          | -            | Press handler             |
| `style`           | `ViewStyle`           | `{}`         | Icon style overrides      |
| `containerStyles` | `ViewStyle`           | `{}`         | Container style overrides |

**Example:**

```tsx
<IconButton
  icon="star"
  iconType="ion"
  size={28}
  color="primary"
  bg={true}
  elevation={2}
  onPress={() => console.log("Starred!")}
/>
```

### LinkButton

A text-based button component for navigation or secondary actions.

**Props:**

| Prop         | Type         | Default  | Description           |
| ------------ | ------------ | -------- | --------------------- |
| `title`      | `string`     | -        | Button text           |
| `color`      | `string`     | `"blue"` | Text color from theme |
| `fontSize`   | `number`     | `12`     | Font size             |
| `fontWeight` | `string`     | `"400"`  | Font weight           |
| `disabled`   | `boolean`    | `false`  | Disabled state        |
| `onPress`    | `() => void` | -        | Press handler         |
| `style`      | `TextStyle`  | `{}`     | Text style overrides  |

**Example:**

```tsx
<LinkButton
  title="Forgot Password?"
  color="primary"
  fontSize={14}
  onPress={() => navigation.navigate("ForgotPassword")}
/>
```

### TextField

A Material Design text input component with comprehensive features.

**Props:**

| Prop           | Type                                   | Default      | Description           |
| -------------- | -------------------------------------- | ------------ | --------------------- |
| `label`        | `string`                               | -            | Input label           |
| `variant`      | `"outlined" \| "filled" \| "standard"` | `"outlined"` | Input variant         |
| `value`        | `string`                               | -            | Input value           |
| `onChangeText` | `(text: string) => void`               | -            | Change handler        |
| `placeholder`  | `string`                               | -            | Placeholder text      |
| `error`        | `boolean`                              | `false`      | Error state           |
| `helperText`   | `string`                               | -            | Helper/error text     |
| `disabled`     | `boolean`                              | `false`      | Disabled state        |
| `multiline`    | `boolean`                              | `false`      | Multiline input       |
| `start`        | `ReactNode`                            | -            | Leading icon/element  |
| `end`          | `ReactNode`                            | -            | Trailing icon/element |

**Example:**

```tsx
<TextField
  label="Email Address"
  variant="outlined"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  error={!!emailError}
  helperText={emailError}
/>
```

### OTPInput

A specialized input component for One-Time Password entry with auto-advance, paste support, and backspace handling.

**Props:**

| Prop       | Type                                  | Default      | Description                      |
| ---------- | ------------------------------------- | ------------ | -------------------------------- |
| `length`   | `number`                              | `6`          | Number of OTP digits             |
| `onChange` | `(value: string) => void`             | -            | Change handler for OTP value     |
| `value`    | `string`                              | `""`         | Current OTP value                |
| `variant`  | `"outlined" \| "text" \| "contained"` | `"outlined"` | Input variant style              |
| `spacing`  | `number`                              | `1`          | Spacing between input boxes      |
| `size`     | `number`                              | `45`         | Size of each input box in pixels |

**Features:**

- **Auto-advance**: Automatically moves to next input after digit entry
- **Paste support**: Handles pasting of complete OTP codes
- **Backspace handling**: Moves to previous input on backspace
- **Number-only input**: Automatically filters non-numeric characters
- **Customizable styling**: Supports different variants and sizes

**Example:**

```tsx
const [otp, setOtp] = useState('');

<OTPInput
  length={6}
  value={otp}
  onChange={setOtp}
  variant="outlined"
  size={50}
  spacing={2}
/>

// Usage with form validation
<OTPInput
  length={4}
  value={otp}
  onChange={(value) => {
    setOtp(value);
    if (value.length === 4) {
      verifyOTP(value);
    }
  }}
  variant="contained"
/>
```

### Locator

A location picker component with Google Maps integration.

**Props:**

| Prop                 | Type                               | Default       | Description                |
| -------------------- | ---------------------------------- | ------------- | -------------------------- |
| `onLocationSelected` | `(location: LocationType) => void` | -             | Location selection handler |
| `label`              | `string`                           | -             | Input label                |
| `variant`            | `"contained" \| "outlined"`        | `"contained"` | Input variant              |
| `location`           | `LocationType`                     | -             | Current location           |
| `country`            | `string`                           | `"ng"`        | Country code for search    |
| `error`              | `boolean`                          | `false`       | Error state                |

**Example:**

```tsx
<Locator
  label="Select Location"
  onLocationSelected={(location) => setSelectedLocation(location)}
  country="us"
/>
```

### SafeAreaView

A safe area wrapper component that handles device-specific safe areas.

**Props:**

| Prop       | Type        | Default | Description               |
| ---------- | ----------- | ------- | ------------------------- |
| `children` | `ReactNode` | -       | Child components          |
| `style`    | `ViewStyle` | `{}`    | Container style overrides |

**Example:**

```tsx
<SafeAreaView style={{ backgroundColor: "white" }}>
  <YourContent />
</SafeAreaView>
```

### AdaptiveStatusBar

A status bar component that automatically adapts to the current theme.

**Props:**

| Prop          | Type      | Default | Description                           |
| ------------- | --------- | ------- | ------------------------------------- |
| `translucent` | `boolean` | `false` | Whether the status bar is translucent |

**Example:**

```tsx
<AdaptiveStatusBar translucent={true} />
```

### AlertX

A customizable alert component for displaying important messages.

**Props:**

| Prop           | Type                                          | Default       | Description               |
| -------------- | --------------------------------------------- | ------------- | ------------------------- |
| `type`         | `"info" \| "warning" \| "success" \| "error"` | `"info"`      | Alert type                |
| `variant`      | `"contained" \| "outlined"`                   | `"contained"` | Alert variant             |
| `title`        | `string`                                      | -             | Alert title               |
| `body`         | `string`                                      | -             | Alert message             |
| `gutterBottom` | `number`                                      | `0`           | Bottom margin in pixels   |
| `style`        | `ViewStyle`                                   | `{}`          | Container style overrides |

**Example:**

```tsx
<AlertX
  type="success"
  title="Success!"
  body="Your profile has been updated successfully."
  gutterBottom={20}
/>
```

### Avatar

A component for displaying user avatars with support for images, labels, or default icons.

**Props:**

| Prop      | Type                        | Default       | Description                 |
| --------- | --------------------------- | ------------- | --------------------------- |
| `source`  | `ImageSourcePropType`       | -             | Image source                |
| `label`   | `string`                    | -             | Text label (first letter)   |
| `size`    | `number`                    | `48`          | Avatar size in pixels       |
| `color`   | `string`                    | `"dark"`      | Background color from theme |
| `variant` | `"contained" \| "outlined"` | `"contained"` | Avatar variant              |
| `style`   | `ViewStyle`                 | `{}`          | Container style overrides   |

**Example:**

```tsx
<Avatar
  source={{ uri: 'https://example.com/avatar.jpg' }}
  size={64}
/>

<Avatar
  label="John Doe"
  color="primary"
  size={48}
/>
```

### Grid & GridItem

Flexible grid layout components for organizing content.

**Grid Props:**

| Prop       | Type        | Default | Description               |
| ---------- | ----------- | ------- | ------------------------- |
| `children` | `ReactNode` | -       | GridItem components       |
| `spacing`  | `number`    | `1`     | Spacing between items     |
| `style`    | `ViewStyle` | `{}`    | Container style overrides |

**GridItem Props:**

| Prop         | Type                                     | Default | Description               |
| ------------ | ---------------------------------------- | ------- | ------------------------- |
| `children`   | `ReactNode`                              | -       | Item content              |
| `col`        | `number`                                 | `2`     | Number of columns to span |
| `alignItems` | `"center" \| "flex-start" \| "flex-end"` | -       | Item alignment            |
| `spacing`    | `number`                                 | `1`     | Item spacing              |
| `style`      | `ViewStyle`                              | `{}`    | Item style overrides      |

**Example:**

```tsx
<Grid spacing={2}>
  <GridItem col={2}>
    <Typography>Full width item</Typography>
  </GridItem>
  <GridItem col={4} alignItems="center">
    <Typography>Quarter width item</Typography>
  </GridItem>
  <GridItem col={4}>
    <Typography>Another quarter width</Typography>
  </GridItem>
</Grid>
```

### FormWrapper

A wrapper component that provides keyboard handling and scrolling for forms.

**Props:**

| Prop                     | Type                            | Default            | Description                 |
| ------------------------ | ------------------------------- | ------------------ | --------------------------- |
| `children`               | `ReactNode`                     | -                  | Form content                |
| `mode`                   | `"scroll" \| "static"`          | `"scroll"`         | Wrapper mode                |
| `behavior`               | `KeyboardAvoidingView` behavior | Platform-dependent | Keyboard avoidance behavior |
| `keyboardVerticalOffset` | `number`                        | `10`               | Keyboard offset             |
| `contentContainerStyle`  | `ViewStyle`                     | `{}`               | ScrollView content style    |
| `style`                  | `ViewStyle`                     | `{}`               | Container style             |
| `onScroll`               | `(event) => void`               | -                  | Scroll event handler        |

**Example:**

```tsx
<FormWrapper mode="scroll" keyboardVerticalOffset={20}>
  <TextField label="Name" />
  <TextField label="Email" />
  <Button title="Submit" />
</FormWrapper>
```

### List, ListItem & ListItemText

Components for displaying structured lists of data.

**List Props:**

| Prop       | Type        | Default | Description               |
| ---------- | ----------- | ------- | ------------------------- |
| `children` | `ReactNode` | -       | ListItem components       |
| `style`    | `ViewStyle` | `{}`    | Container style overrides |

**ListItem Props:**

| Prop       | Type         | Default | Description               |
| ---------- | ------------ | ------- | ------------------------- |
| `children` | `ReactNode`  | -       | Item content              |
| `link`     | `boolean`    | `false` | Show arrow indicator      |
| `divider`  | `boolean`    | `false` | Show bottom border        |
| `onPress`  | `() => void` | -       | Press handler             |
| `index`    | `number`     | `1`     | Item index for animations |
| `style`    | `ViewStyle`  | `{}`    | Item style overrides      |

**ListItemText Props:**

| Prop             | Type              | Default | Description               |
| ---------------- | ----------------- | ------- | ------------------------- |
| `primary`        | `string`          | -       | Primary text              |
| `secondary`      | `string`          | -       | Secondary text            |
| `divider`        | `boolean`         | `false` | Show bottom border        |
| `primaryProps`   | `TypographyProps` | `{}`    | Primary text props        |
| `secondaryProps` | `TypographyProps` | `{}`    | Secondary text props      |
| `style`          | `ViewStyle`       | `{}`    | Container style overrides |

**Example:**

```tsx
<List>
  <ListItem link onPress={() => navigate("Profile")}>
    <ListItemText primary="Profile Settings" secondary="Manage your account" />
  </ListItem>
  <ListItem divider>
    <ListItemText primary="Notifications" />
  </ListItem>
</List>
```

### Popup

A modal component for overlays, dialogs, and bottom sheets.

**Props:**

| Prop                     | Type                | Default | Description               |
| ------------------------ | ------------------- | ------- | ------------------------- |
| `open`                   | `boolean`           | -       | Whether popup is visible  |
| `onClose`                | `() => void`        | -       | Close handler             |
| `title`                  | `string`            | -       | Popup title               |
| `children`               | `ReactNode`         | -       | Popup content             |
| `sheet`                  | `boolean \| number` | `false` | Bottom sheet mode/height  |
| `bare`                   | `boolean`           | `false` | Hide header and padding   |
| `keyboardVerticalOffset` | `number`            | -       | Keyboard avoidance offset |
| `onModalShow`            | `() => void`        | -       | Callback when modal shows |
| `onModalHide`            | `() => void`        | -       | Callback when modal hides |
| `style`                  | `ViewStyle`         | `{}`    | Container style overrides |

**Example:**

```tsx
<Popup
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  sheet={400}
  onModalShow={() => console.log("Modal is now visible")}
  onModalHide={() => console.log("Modal is now hidden")}
>
  <Typography>Are you sure you want to delete this item?</Typography>
  <Button title="Delete" color="error" />
  <Button title="Cancel" variant="outlined" />
</Popup>
```

### Spinner

A loading indicator component with customizable appearance.

**Props:**

| Prop         | Type                 | Default     | Description               |
| ------------ | -------------------- | ----------- | ------------------------- |
| `size`       | `"small" \| "large"` | `"large"`   | Spinner size              |
| `color`      | `string`             | `"primary"` | Spinner color from theme  |
| `label`      | `string`             | -           | Loading text              |
| `fullscreen` | `boolean`            | `false`     | Cover entire screen       |
| `style`      | `ViewStyle`          | `{}`        | Container style overrides |

**Example:**

```tsx
<Spinner size="large" color="primary" label="Loading..." fullscreen={true} />
```

### Animator

A unified component that provides a single interface for all animation types with generic props. Built with **react-native-reanimated** for optimal performance and smooth animations.

**Features:**

- **Single Component**: One component handles all animation types
- **Generic Props**: Consistent prop naming across all animations (e.g., `closeAfter` instead of animation-specific names)
- **Modular Hooks**: Animation logic is separated into individual custom hooks
- **Type Safety**: Full TypeScript support with proper typing
- **Performance**: Built with react-native-reanimated for native performance
- **Smooth Animations**: Runs on the UI thread for 60fps animations

**Requirements:**

Requires `react-native-reanimated` as peer dependencies. Make sure to follow the [react-native-reanimated installation guide](https://docs.swmansion.com/react-native-reanimated/docs/3.x/fundamentals/getting-started) for platform-specific setup.

**Generic Props:**

All animation types support these generic props:

| Prop         | Type                                                                        | Default | Description                                                   |
| ------------ | --------------------------------------------------------------------------- | ------- | ------------------------------------------------------------- |
| `type`       | `"fade" \| "grow" \| "slide" \| "blink" \| "float" \| "roll" \| "thrownup"` | -       | Animation type                                                |
| `duration`   | `number`                                                                    | `500`   | Animation duration in milliseconds                            |
| `delay`      | `number`                                                                    | `0`     | Delay before animation starts                                 |
| `closeAfter` | `number \| null`                                                            | `null`  | Time after which the exit animation starts (null for no exit) |
| `style`      | `ViewStyle`                                                                 | `{}`    | Additional styles for the animated view                       |

**Animation-Specific Props:**

**Slide Animation:**

- `direction`: `"up" \| "down" \| "left" \| "right"`
- `initialValue`: Custom initial position value

**Grow Animation:**

- `initialScale`: Starting scale (default: 0)

**Blink Animation:**

- `blinkDuration`: Duration of one blink cycle
- `minOpacity`: Minimum opacity value
- `maxOpacity`: Maximum opacity value

**Float Animation:**

- `closeDuration`: Duration of exit animation
- `floatDistance`: Distance to float up/down
- `floatDuration`: Duration of one float cycle

**Roll Animation:**

- `initialTranslateY`: Initial vertical position
- `initialRotate`: Initial rotation value

**Examples:**

```tsx
// Fade animation
<Animator type="fade" duration={1000} closeAfter={3000}>
  <Text>This will fade in and out</Text>
</Animator>

// Slide animation
<Animator type="slide" direction="up" duration={800} closeAfter={2000}>
  <View>This will slide up from bottom</View>
</Animator>

// Grow animation
<Animator type="grow" initialScale={0.5} duration={600}>
  <Button>This will grow from 50% scale</Button>
</Animator>

// Blink animation (continuous)
<Animator type="blink" blinkDuration={1000} minOpacity={0.3}>
  <Icon>This will blink continuously</Icon>
</Animator>

// Float animation
<Animator type="float" floatDistance={20} floatDuration={2000} closeAfter={5000}>
  <View>This will float up and down</View>
</Animator>

// Roll animation
<Animator type="roll" initialRotate="45deg" duration={800}>
  <Image>This will roll and rotate</Image>
</Animator>

// Thrown up animation
<Animator type="thrownup" delay={500} closeAfter={4000}>
  <Notification>This will spring up from bottom</Notification>
</Animator>
```

**Available Animation Types:**

1. **fade**: Simple fade in/out using opacity (native performance)
2. **grow**: Scale-based growth animation with easing
3. **slide**: Directional slide animations from screen edges
4. **blink**: Continuous opacity blinking with repeat
5. **float**: Floating up/down motion with fade effects
6. **roll**: Combined rotation and translation effects
7. **thrownup**: Spring-based upward animation with physics

All animations run on the UI thread for optimal performance and smooth 60fps animations.

**Using Animation Hooks Directly:**

You can also use the animation hooks directly for custom implementations with react-native-reanimated:

```tsx
import { useFadeAnimation, useSlideAnimation } from "@hoddy-ui/core";
import Animated from "react-native-reanimated";

const MyComponent = () => {
  const { animatedStyle } = useFadeAnimation({
    duration: 800,
    closeAfter: 2000,
  });

  return (
    <Animated.View style={animatedStyle}>
      <Text>Custom animated content</Text>
    </Animated.View>
  );
};
```

**Performance Benefits:**

With react-native-reanimated, all animations:

- **Run on the UI thread** for better performance
- **Maintain 60fps** even during JavaScript thread blocking
- **Use native drivers** automatically
- **Support worklets** for complex animation logic
- **Provide smooth gestures** and interactions

**Migration from Legacy API:**

Replace old individual animation components:

```tsx
// Old way
<AnimatedFade fadeOutAfter={2000}>
  <Text>Content</Text>
</AnimatedFade>

// New way
<Animator type="fade" closeAfter={2000}>
  <Text>Content</Text>
</Animator>
```

### FlashMessage

Display toast notifications and alerts.

**Props:**

| Prop       | Type                                          | Default  | Description            |
| ---------- | --------------------------------------------- | -------- | ---------------------- |
| `message`  | `string`                                      | -        | Message text           |
| `type`     | `"success" \| "error" \| "warning" \| "info"` | `"info"` | Message type           |
| `duration` | `number`                                      | `3000`   | Display duration in ms |
| `position` | `"top" \| "bottom"`                           | `"top"`  | Message position       |

**Usage:**

```tsx
import { showMessage } from "@hoddy-ui/core";

// Show a success message
showMessage({
  message: "Profile updated successfully!",
  type: "success",
});
```

## 🔧 Hooks

### useColors

Access the current theme's color palette:

```tsx
import { useColors } from "@hoddy-ui/core";

function MyComponent() {
  const colors = useColors();

  return (
    <View style={{ backgroundColor: colors.primary.main }}>
      {/* Component content */}
    </View>
  );
}
```

### useTheme

Access and control the current theme:

```tsx
import { useTheme } from "@hoddy-ui/core";

function ThemeAwareComponent() {
  const { themeState, themeDispatch } = useTheme();

  const toggleTheme = () => {
    themeDispatch({
      type: themeState.mode === "dark" ? "light" : "dark",
    });
  };

  return <Button title="Toggle Theme" onPress={toggleTheme} />;
}
```

### useNavScreenOptions

Get theme-aware navigation screen options:

```tsx
import { useNavScreenOptions } from "@hoddy-ui/core";

function MyScreen() {
  const screenOptions = useNavScreenOptions("stack");

  // Use with React Navigation
  return (
    <Stack.Screen name="Home" component={HomeScreen} options={screenOptions} />
  );
}
```

### Animation Hooks

Access animation logic directly for custom implementations using react-native-reanimated:

#### useFadeAnimation

```tsx
import { useFadeAnimation } from "@hoddy-ui/core";
import Animated from "react-native-reanimated";

function FadeComponent() {
  const { animatedStyle } = useFadeAnimation({
    duration: 800,
    closeAfter: 2000,
  });

  return (
    <Animated.View style={animatedStyle}>
      <Text>This will fade in and out</Text>
    </Animated.View>
  );
}
```

#### useSlideAnimation

```tsx
import { useSlideAnimation } from "@hoddy-ui/core";
import Animated from "react-native-reanimated";

function SlideComponent() {
  const { animatedStyle } = useSlideAnimation({
    direction: "up",
    duration: 600,
    initialValue: 100,
  });

  return (
    <Animated.View style={animatedStyle}>
      <Text>This will slide up</Text>
    </Animated.View>
  );
}
```

#### useGrowAnimation

```tsx
import { useGrowAnimation } from "@hoddy-ui/core";
import Animated from "react-native-reanimated";

function GrowComponent() {
  const { animatedStyle } = useGrowAnimation({
    duration: 500,
    initialScale: 0.5,
  });

  return (
    <Animated.View style={animatedStyle}>
      <Text>This will grow from 50% scale</Text>
    </Animated.View>
  );
}
```

#### Other Animation Hooks

- `useBlinkAnimation` - For continuous blinking effects
- `useFloatAnimation` - For floating up/down motion
- `useRollAnimation` - For rotation and translation effects
- `useThrownUpAnimation` - For spring-based upward animations

All animation hooks accept similar configuration objects with properties like `duration`, `delay`, and animation-specific options. They return `animatedStyle` objects that work with `Animated.View` from react-native-reanimated for optimal performance.

## 🎯 Advanced Usage

### Custom Theme Provider

Create your own theme provider with custom configurations:

```tsx
import { UIThemeProvider, initialize } from "@hoddy-ui/core";

// Initialize with custom configuration
initialize({
  fontFamily: "CustomFont-Regular",
  colors: {
    primary: { main: "#FF6B6B" },
    secondary: { main: "#4ECDC4" },
  },
});

function App() {
  return (
    <UIThemeProvider>
      <YourAppContent />
    </UIThemeProvider>
  );
}
```

### Form Validation Example

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { TextField, Button, FormWrapper } from "@hoddy-ui/core";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // Handle form submission
    }
  };

  return (
    <FormWrapper>
      <TextField
        label="Email"
        value={email}
        onChangeText={setEmail}
        error={!!errors.email}
        helperText={errors.email}
        keyboardType="email-address"
      />

      <TextField
        label="Password"
        value={password}
        onChangeText={setPassword}
        error={!!errors.password}
        helperText={errors.password}
        secureTextEntry
      />

      <Button
        title="Login"
        onPress={handleSubmit}
        variant="contained"
        color="primary"
      />
    </FormWrapper>
  );
}
```

## 📱 Platform Compatibility

- **React Native**: ≥ 0.71.8
- **Expo**: SDK 48+
- **iOS**: 11.0+
- **Android**: API 21+ (Android 5.0)
- **TypeScript**: ≥ 5.0.4

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

## 📄 License

MIT © [Hoddy Inc](https://github.com/kinghoddy)

## 🔗 Links

- [GitHub Repository](https://github.com/kinghoddy/hoddy-ui)
- [npm Package](https://www.npmjs.com/package/@hoddy-ui/core)
- [Issues & Support](https://github.com/kinghoddy/hoddy-ui/issues)

---

**Need help?** [Open an issue](https://github.com/kinghoddy/hoddy-ui/issues) or check out our [examples](../../test/my-app).
