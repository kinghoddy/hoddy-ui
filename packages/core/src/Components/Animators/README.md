# Unified Animator Component

The `Animator` component provides a single interface for all animation types with generic props.

## Features

- **Single Component**: One component handles all animation types
- **Generic Props**: Consistent prop naming across all animations (e.g., `closeAfter` instead of animation-specific names)
- **Modular Hooks**: Animation logic is separated into individual custom hooks
- **Type Safety**: Full TypeScript support with proper typing
- **Performance**: Only the specified animation runs, others are not loaded

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

You can also use the animation hooks directly:

```tsx
import { useFadeAnimation, useSlideAnimation } from "hoddy-ui";

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

## Migration from Old Components

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

## Available Animation Types

1. **fade**: Simple fade in/out
2. **grow**: Scale-based growth animation
3. **slide**: Directional slide animations
4. **blink**: Continuous opacity blinking
5. **float**: Floating up/down motion with fade
6. **roll**: Combined rotation and translation
7. **thrownup**: Spring-based upward animation
