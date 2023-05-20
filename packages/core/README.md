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

## Components

Hoddy UI provides the following components for building your UI:

- [AdaptiveStatusBar](#adaptivestatusbar)
- [Avatar](#avatar)
- [AlertX](#alertx)
- [Button](#button)
- [FlashMessage](#flashmessage)
- [FormWrapper](#formwrapper)
- [Grid](#grid)
- [GridItem](#griditem)
- [IconButton](#iconbutton)
- [LinkButton](#linkbutton)
- [List](#list)
- [ListItem](#listitem)
- [ListItemText](#listitemtext)
- [Locator](#locator)
- [Popup](#popup)
- [SafeAreaView](#safeareaview)
- [Spinner](#spinner)
- [TextField](#textfield)
- [TextField2](#textfield2)
- [Typography](#typography)

## Component API Reference

### AdaptiveStatusBar

A component that adapts the status bar color based on the theme.

**Props:**

| Prop            | Type   | Default         | Description                                                                               |
| --------------- | ------ | --------------- | ----------------------------------------------------------------------------------------- |
| barStyle        | string | "light-content" | The style of the status bar. Possible values: "default", "light-content", "dark-content". |
| backgroundColor | string | Theme-dependent | The background color of the status bar.                                                   |

Example usage:

```jsx
import { AdaptiveStatusBar } from "@hoddy-ui/core";

const App = () => {
  return (
    <>
      <AdaptiveStatusBar />
      {/* Rest of the app */}
    </>
  );
};
```

### Avatar

A component for displaying user avatars.

**Props:**

| Prop    | Type    | Default | Description                           |
| ------- | ------- | ------- | ------------------------------------- |
| image   | number  | -       | The source of the avatar image.       |
| size    | number  | 40      | The size of the avatar in pixels.     |
| rounded | boolean | false   | Whether the avatar should be rounded. |

### AlertX

A customizable alert component.

**Props:**

| Prop    | Type   | Default   | Description                                                                       |
| ------- | ------ | --------- | --------------------------------------------------------------------------------- |
| title   | string | -         | The title of the alert.                                                           |
| message | string | -         | The message/content of the alert.                                                 |
| type    | string | "default" | The type of the alert. Possible values: "default", "success", "error", "warning". |

### Button

A customizable button component.

**Props:**

| Prop    | Type     | Default | Description                                |
| ------- | -------- | ------- | ------------------------------------------ |
| title   | string   | -       | The text to display on the button.         |
| onPress | function | -       | The function to be called on button press. |

### FlashMessage

A component for displaying flash messages.

**Props:**

| Prop     | Type    | Default   | Description                                                                               |
| -------- | ------- | --------- | ----------------------------------------------------------------------------------------- |
| message  | string  | -         | The message/content of the flash message.                                                 |
| type     | string  | "default" | The type of the flash message. Possible values: "default", "success", "error", "warning". |
| duration | number  | 3000      | The duration in milliseconds that the flash message should be displayed.                  |
| autoHide | boolean | true      | Whether the flash message should auto-hide after the specified duration.                  |

### FormWrapper

A wrapper component for form fields.

**Props:**

| Prop     | Type | Default | Description                               |
| -------- | ---- | ------- | ----------------------------------------- |
| children | node | -       | The form fields/components to be wrapped. |

### Grid

A flexible grid component for arranging child elements.

**Props:**

| Prop       | Type   | Default | Description                                    |
| ---------- | ------ | ------- | ---------------------------------------------- |
| children   | node   | -       | The child elements to be rendered in the grid. |
| numColumns | number | 2       | The number of columns in the grid.             |
| spacing    | number | 10      | The spacing between grid items in pixels.      |

### GridItem

A component representing an item in the Grid component.

**Props:**

| Prop     | Type | Default | Description                   |
| -------- | ---- | ------- | ----------------------------- |
| children | node | -       | The content of the grid item. |

### IconButton

A button component with an icon.

**Props:**

| Prop    | Type     | Default | Description                                |
| ------- | -------- | ------- | ------------------------------------------ |
| icon    | string   | -       | The name of the icon to display.           |
| onPress | function | -       | The function to be called on button press. |

### LinkButton

A button component that navigates to a specified URL.

**Props:**

| Prop  | Type   | Default | Description                             |
| ----- | ------ | ------- | --------------------------------------- |
| title | string | -       | The text to display on the button.      |
| url   | string | -       | The URL to navigate to on button press. |

### List

A component for rendering lists.

**Props:**

| Prop     | Type | Default | Description                    |
| -------- | ---- | ------- | ------------------------------ |
| children | node | -       | The list items to be rendered. |

### ListItem

A component representing an item in the List component.

**Props:**

| Prop     | Type | Default | Description                   |
| -------- | ---- | ------- | ----------------------------- |
| children | node | -       | The content of the list item. |

### ListItemText

A component representing the text content of a ListItem.

**Props:**

| Prop     | Type | Default | Description              |
| -------- | ---- | ------- | ------------------------ |
| children | node | -       | The text to be rendered. |

### Locator

A component for displaying a location marker on a map.

**Props:**

| Prop      | Type   | Default | Description                    |
| --------- | ------ | ------- | ------------------------------ |
| latitude  | number | -       | The latitude of the location.  |
| longitude | number | -       | The longitude of the location. |

### Popup

A customizable popup component.

**Props:**

| Prop    | Type     | Default | Description                                         |
| ------- | -------- | ------- | --------------------------------------------------- |
| title   | string   | -       | The title of the popup.                             |
| onClose | function | -       | The function to be called when the popup is closed. |

### SafeAreaView

A component that renders content within the safe area boundaries of the device.

**Props:**

| Prop     | Type | Default | Description                 |
| -------- | ---- | ------- | --------------------------- |
| children | node | -       | The content to be rendered. |

### Spinner

A component for displaying a loading spinner.

**Props:**

| Prop  | Type   | Default         | Description                                                 |
| ----- | ------ | --------------- | ----------------------------------------------------------- |
| size  | string | "small"         | The size of the spinner. Possible values: "small", "large". |
| color | string | Theme-dependent | The color of the spinner.                                   |

### TextField

A component for text input.

**Props:**

| Prop        | Type   | Default | Description                         |
| ----------- | ------ | ------- | ----------------------------------- |
| label       | string | -       | The label for the text input.       |
| placeholder | string | -       | The placeholder text for the input. |

### TextField2

Another component for text input.

**Props:**

| Prop        | Type   | Default | Description                         |
| ----------- | ------ | ------- | ----------------------------------- |
| label       | string | -       | The label for the text input.       |
| placeholder | string | -       | The placeholder text for the input. |

### Typography

A component for displaying text with different styles.

**Props:**

| Prop     | Type   | Default | Description                                                                                          |
| -------- | ------ | ------- | ---------------------------------------------------------------------------------------------------- |
| variant  | string | "body"  | The style variant of the text. Possible values: "heading", "title", "subheading", "body", "caption". |
| children | node   | -       | The text content to be rendered.                                                                     |
