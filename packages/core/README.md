# @hoddy-ui/core

Hoddy UI is a versatile UI component and theming library for React Native and Expo. It follows the Hoddy UI design guidelines, which are a tweak of Material Design. The library provides a collection of reusable components and a customizable theming system to simplify and accelerate the development of mobile applications.

## Installation

To install Hoddy UI, use npm or yarn:

**npm:**

```sh
npm install @hoddy-ui/core
```

**yarn:**

```sh
yarn add @hoddy-ui/core
```

Hoddy UI has the following peer dependencies, make sure to install them as well:

```json
"@expo/vector-icons": "^13.0.0",
"@react-native-async-storage/async-storage": "^1.18.1",
"@react-navigation/native": "^6.1.6",
"expo-navigation-bar": "^2.1.1",
"expo-system-ui": "^2.2.1",
"react": "^18.2.0",
"react-native": "^0.71.8",
"react-native-safe-area-context": "^4.5.3",
"react-native-size-matters": "^0.4.0"
```

## Enabling dark mode

To take advantage of the dark mode feature, add the UIProvider component to the root of your app

```javascript
import { UIThemeProvider } from "hoddy-ui/core";

function App() {
  return (
    <UIThemeProvider>
      <Component />
    </UIThemeProvider>
  );
}
```

## Usage

Here's a quick example of how to use Hoddy UI in your React Native or Expo project:

```javascript
import React from "react";
import { View } from "react-native";
import { Button, Typography } from "@hoddy-ui/core";

const HomeScreen = () => {
  return (
    <View>
      <Typography>Welcome to Hoddy UI!</Typography>
      <Button title="Click me" onPress={() => console.log("Button pressed!")} />
    </View>
  );
};

export default HomeScreen;
```
