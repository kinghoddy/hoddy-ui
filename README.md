# Hoddy UI

**A comprehensive, modern UI component library for React Native and Expo applications**

Hoddy UI is a versatile UI component and theming library that follows the Hoddy UI design guidelines—a refined take on Material Design. Built with TypeScript, it provides a collection of reusable components, utilities, and a customizable theming system to simplify and accelerate mobile app development.

## 🌟 Features

- **🎨 Modern Design**: Clean, Material Design-inspired components
- **🌗 Dark Mode**: Built-in dark/light theme support with system preference detection
- **📱 Cross Platform**: Works seamlessly with React Native and Expo
- **🔧 TypeScript**: Full TypeScript support with comprehensive type definitions
- **⚡ Performance**: Optimized components with minimal bundle size
- **🎯 Accessibility**: ARIA-compliant and screen reader friendly
- **🔌 Extensible**: Highly customizable with theming and configuration options
- **📐 Responsive**: Built-in responsive utilities and grid system
- **🎬 Rich Animations**: 7 built-in animation types with customizable timing and effects

## 📦 Packages

Hoddy UI is organized as a monorepo with multiple packages:

### Core Packages

| Package                                | Version                                              | Description                                  |
| -------------------------------------- | ---------------------------------------------------- | -------------------------------------------- |
| [@hoddy-ui/core](./packages/core)      | ![npm](https://img.shields.io/npm/v/@hoddy-ui/core)  | Main component library for React Native/Expo |
| [@hoddy-ui/next](./packages/core/next) | ![npm](https://img.shields.io/npm/v/@hoddy-ui/next)  | Components optimized for Expo Router         |
| [@hoddy-ui/utils](./packages/utils)    | ![npm](https://img.shields.io/npm/v/@hoddy-ui/utils) | Utility functions and helpers                |

## 🚀 Quick Start

### Installation

Choose the package that best fits your project:

**For standard React Native/Expo projects:**

```bash
npm install @hoddy-ui/core
# or
yarn add @hoddy-ui/core
```

**For projects using Expo Router:**

```bash
npm install @hoddy-ui/next
# or
yarn add @hoddy-ui/next
```

**For utility functions:**

```bash
npm install @hoddy-ui/utils
# or
yarn add @hoddy-ui/utils
```

### Peer Dependencies

Install the required peer dependencies:

```bash
npm install @expo/vector-icons @react-native-async-storage/async-storage @react-navigation/native expo-navigation-bar expo-system-ui react-native-safe-area-context react-native-size-matters react-native-reanimated react-native-worklets
```

**Important**: For `react-native-reanimated`, make sure to follow the [installation guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/) for platform-specific setup as it requires additional configuration for iOS and Android.

### Basic Setup

1. **Wrap your app with the theme provider:**

```tsx
import React from "react";
import { UIThemeProvider, initialize } from "@hoddy-ui/core";
import App from "./App";

// Optional: Configure the library
initialize({
  fontFamily: "YourCustomFont",
  edgeToEdge: false, // Set to true for edge-to-edge display
  colors: {
    // Custom color overrides
    primary: { main: "#6366f1" },
  },
});

export default function Root() {
  return (
    <UIThemeProvider>
      <App />
    </UIThemeProvider>
  );
}
```

2. **Start using components:**

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import {
  Typography,
  Button,
  TextField,
  OTPInput,
  Animator,
} from "@hoddy-ui/core";

export default function HomeScreen() {
  const [otp, setOtp] = useState("");

  return (
    <View style={{ padding: 20 }}>
      <Animator type="fade" duration={1000}>
        <Typography variant="h4" gutterBottom={20}>
          Welcome to Hoddy UI!
        </Typography>
      </Animator>

      <Animator type="slide" direction="up" delay={200}>
        <TextField
          label="Email"
          variant="outlined"
          keyboardType="email-address"
        />
      </Animator>

      <Animator type="slide" direction="up" delay={300}>
        <OTPInput length={6} value={otp} onChange={setOtp} variant="outlined" />
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

### Library Initialization

Configure Hoddy UI globally using the `initialize` function:

```tsx
import { initialize } from "@hoddy-ui/core";

initialize({
  // Custom font family
  fontFamily: "Inter-Regular",

  // Google Maps API key for Locator component
  googleMapApiKey: "your-api-key",

  // Edge-to-edge display (affects Android navigation bar)
  edgeToEdge: true,

  // Custom color palette
  colors: {
    primary: {
      main: "#6366f1",
      light: "#818cf8",
      dark: "#4f46e5",
    },
    secondary: {
      main: "#ec4899",
      light: "#f472b6",
      dark: "#db2777",
    },
  },
});
```

### Theme Configuration

The theme system supports:

- **Automatic**: Follows system theme preference
- **Light**: Force light theme
- **Dark**: Force dark theme

Users can switch themes at runtime using the theme context.

## 🧱 Component Categories

### Layout & Navigation

- `SafeAreaView` - Safe area wrapper
- `Grid` & `GridItem` - Flexible grid system
- `AdaptiveStatusBar` - Theme-aware status bar

### Typography & Text

- `Typography` - Comprehensive text component
- Rich text support with multiple variants (h1-h6, body1, body2, caption)

### Form Components

- `TextField` - Material Design text input
- `TextField2` - Alternative text field variant
- `OTPInput` - One-Time Password input with auto-advance and paste support
- `FormWrapper` - Form container with validation
- `Locator` - Location picker with Google Maps integration

### Interactive Elements

- `Button` - Primary action button
- `IconButton` - Icon-only button
- `LinkButton` - Text-based button

### Feedback & Communication

- `FlashMessage` - Toast notifications
- `AlertX` - Alert dialogs
- `Spinner` - Loading indicators

### Data Display

- `Avatar` - User profile images
- `List`, `ListItem`, `ListItemText` - List components

### Overlays

- `Popup` - Modal dialogs and sheets with lifecycle callbacks and smooth animations

### Animation

- `Animator` - Unified animation component with 7 animation types (fade, grow, slide, blink, float, roll, thrownup)
- Built with react-native-reanimated for 60fps native performance
- Animation hooks - Direct access to animation logic (`useFadeAnimation`, `useSlideAnimation`, etc.)

## 🎬 Animation System

Hoddy UI includes a comprehensive animation system with a unified `Animator` component that provides 7 different animation types with consistent, easy-to-use props.

### Animation Types

1. **Fade** - Smooth fade in/out transitions
2. **Grow** - Scale-based growth animations
3. **Slide** - Directional slide animations (up, down, left, right)
4. **Blink** - Continuous opacity blinking effects
5. **Float** - Floating up/down motion with fade
6. **Roll** - Combined rotation and translation effects
7. **Thrown Up** - Spring-based upward animations

### Quick Animation Examples

```tsx
import { Animator } from "@hoddy-ui/core";

// Fade animation with auto-close
<Animator type="fade" duration={1000} closeAfter={3000}>
  <Notification>This fades in and out after 3 seconds</Notification>
</Animator>

// Slide animation from bottom
<Animator type="slide" direction="up" duration={800}>
  <Modal>This slides up from the bottom</Modal>
</Animator>

// Continuous blinking effect
<Animator type="blink" blinkDuration={1000} minOpacity={0.3}>
  <Badge>This blinks continuously</Badge>
</Animator>

// Custom floating effect
<Animator type="float" floatDistance={20} floatDuration={2000}>
  <FloatingButton>This floats up and down</FloatingButton>
</Animator>
```

### Direct Hook Usage

For advanced use cases, access animation hooks directly:

```tsx
import { useFadeAnimation, useSlideAnimation } from "@hoddy-ui/core";

const MyComponent = () => {
  const { animatedStyle } = useFadeAnimation({
    duration: 800,
    closeAfter: 2000,
  });

  return (
    <Animated.View style={animatedStyle}>
      <CustomContent />
    </Animated.View>
  );
};
```

## 🛠️ Utilities (@hoddy-ui/utils)

```tsx
import {
  currencyFormatter,
  numberFormatter,
  errorMessage,
} from "@hoddy-ui/utils";

// Format currency
const price = currencyFormatter(1234.56); // "₦ 1,234.56"

// Format phone numbers
const phone = numberFormatter("08012345678"); // "+234 801 234 5678"

// Extract error messages
const error = errorMessage(apiError); // Standardized error message
```

## 🎨 Theming & Customization

### Color System

Hoddy UI uses a comprehensive color system with semantic naming:

```tsx
const colors = {
  primary: { main: "#007AFF", light: "#5AC8FA", dark: "#0051D5" },
  secondary: { main: "#FF3B30", light: "#FF6B6B", dark: "#D70015" },
  white: ["#FFFFFF", "#F8F9FA", "#E9ECEF"],
  black: ["#000000", "#212529", "#495057"],
  blue: { main: "#007AFF", light: "#5AC8FA", dark: "#0051D5" },
  // ... and many more
};
```

### Typography Scale

```tsx
const typography = {
  h1: 42,
  h2: 37,
  h3: 32,
  h4: 27,
  h5: 22,
  h6: 17,
  body1: 15,
  body2: 12,
  caption: 10,
};
```

## 📱 Platform Support

- **React Native**: ≥ 0.71.8
- **Expo**: SDK 48+
- **iOS**: 11.0+
- **Android**: API 21+ (Android 5.0)
- **TypeScript**: ≥ 5.0.4

## 📖 Documentation

- [Core Components API](./packages/core/README.md)
- [Migration Guide](./MIGRATION.md) _(coming soon)_
- [Examples](./test/hoddyui) - Sample implementation

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/kinghoddy/hoddy-ui.git
cd hoddy-ui

# Install dependencies
yarn install

# Run the test app
cd test/hoddyui
expo start
```

## 📄 License

MIT © [Hoddy Inc](https://github.com/kinghoddy)

## 🔗 Links

- [GitHub Repository](https://github.com/kinghoddy/hoddy-ui)
- [npm Package (@hoddy-ui/core)](https://www.npmjs.com/package/@hoddy-ui/core)
- [npm Package (@hoddy-ui/next)](https://www.npmjs.com/package/@hoddy-ui/next)
- [npm Package (@hoddy-ui/utils)](https://www.npmjs.com/package/@hoddy-ui/utils)

## 🐛 Issues & Support

Found a bug or need help? Please [open an issue](https://github.com/kinghoddy/hoddy-ui/issues) on GitHub.

---

**Made with ❤️ by the Hoddy team**
