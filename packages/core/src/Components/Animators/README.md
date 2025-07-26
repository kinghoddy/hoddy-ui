# Unified Animator Component

The `Animator` component provides a single interface for all animation types with generic props. Built with **react-native-reanimated** for optimal performance and smooth animations.

## Features

- **Single Component**: One component handles all animation types
- **Generic Props**: Consistent prop naming across all animations (e.g., `closeAfter` instead of animation-specific names)
- **Modular Hooks**: Animation logic is separated into individual custom hooks
- **Type Safety**: Full TypeScript support with proper typing
- **Performance**: Built with react-native-reanimated for native performance
- **Smooth Animations**: Runs on the UI thread for 60fps animations

## Requirements

This component requires `react-native-reanimated` and `react-native-worklets` as peer dependencies:

```bash
npm install react-native-reanimated react-native-worklets
# or
yarn add react-native-reanimated react-native-worklets
```

Make sure to follow the [react-native-reanimated installation guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/) for platform-specific setup.

## Basic Usage

```tsx
import { Animator } from 'hoddy-ui';

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

## Generic Props

All animation types support these generic props:

- `type`: Animation type ("fade" | "grow" | "slide" | "blink" | "float" | "roll" | "thrownup")
- `duration`: Animation duration in milliseconds
- `delay`: Delay before animation starts
- `closeAfter`: Time after which the exit animation starts (null for no exit)
- `style`: Additional styles for the animated view

## Animation-Specific Props

### Slide Animation

- `direction`: "up" | "down" | "left" | "right"
- `initialValue`: Custom initial position value

### Grow Animation

- `initialScale`: Starting scale (default: 0)

### Blink Animation

- `blinkDuration`: Duration of one blink cycle
- `minOpacity`: Minimum opacity value
- `maxOpacity`: Maximum opacity value

### Float Animation

- `closeDuration`: Duration of exit animation
- `floatDistance`: Distance to float up/down
- `floatDuration`: Duration of one float cycle

### Roll Animation

- `initialTranslateY`: Initial vertical position
- `initialRotate`: Initial rotation value

## Custom Hooks

You can also use the animation hooks directly with react-native-reanimated:

```tsx
import { useFadeAnimation, useSlideAnimation } from "hoddy-ui";
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

## Performance Benefits

With react-native-reanimated, all animations:

- **Run on the UI thread** for better performance
- **Maintain 60fps** even during JavaScript thread blocking
- **Use native drivers** automatically
- **Support worklets** for complex animation logic
- **Provide smooth gestures** and interactions

## Migration from Legacy Animated API

If you're migrating from the old react-native Animated API:

```tsx
// Old way (Legacy Animated API)
import { Animated } from "react-native";

const fadeAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();
}, []);

return <Animated.View style={{ opacity: fadeAnim }} />;

// New way (react-native-reanimated)
<Animator type="fade" duration={1000}>
  <Text>Content</Text>
</Animator>;
```

## Available Animation Types

1. **fade**: Simple fade in/out using opacity
2. **grow**: Scale-based growth animation with easing
3. **slide**: Directional slide animations from screen edges
4. **blink**: Continuous opacity blinking with repeat
5. **float**: Floating up/down motion with fade effects
6. **roll**: Combined rotation and translation effects
7. **thrownup**: Spring-based upward animation with physics

## Advanced Usage

### Custom Animation Sequences

```tsx
import {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const CustomAnimatedComponent = () => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    scale.value = withSequence(
      withTiming(1.2, { duration: 300 }),
      withTiming(0.8, { duration: 300 }),
      withTiming(1, { duration: 300 })
    );
  }, []);

  return <Animated.View style={animatedStyle} />;
};
```

### Layout Animations

```tsx
import { Layout, FadeIn, FadeOut } from "react-native-reanimated";

<Animator type="fade">
  <Animated.View entering={FadeIn} exiting={FadeOut} layout={Layout}>
    <Text>This supports layout animations too!</Text>
  </Animated.View>
</Animator>;
```

## Troubleshooting

### Common Issues

1. **Animations not running**: Ensure react-native-reanimated is properly installed and configured
2. **Poor performance**: Check that animations are not running on the JavaScript thread
3. **Missing worklets**: Install react-native-worklets if using complex animation logic

### Performance Tips

- Use `useAnimatedStyle` for style animations
- Prefer `withTiming` and `withSpring` over complex sequences
- Avoid frequent re-renders during animations
- Use `runOnJS` sparingly for callbacks

## Migration Guide

### From Individual Animation Components

```tsx
// Old components
<FadeAnimation duration={1000}>
  <Text>Content</Text>
</FadeAnimation>

<SlideAnimation direction="up">
  <Text>Content</Text>
</SlideAnimation>

// New unified component
<Animator type="fade" duration={1000}>
  <Text>Content</Text>
</Animator>

<Animator type="slide" direction="up">
  <Text>Content</Text>
</Animator>
```

### From React Native Animated API

```tsx
// Old API
const opacity = useRef(new Animated.Value(0)).current;

Animated.timing(opacity, {
  toValue: 1,
  duration: 1000,
  useNativeDriver: true,
}).start();

// New reanimated API (using hooks directly)
const { animatedStyle } = useFadeAnimation({ duration: 1000 });
```
