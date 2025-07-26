import { initialize } from "./src/config";

// Components
export { default as AdaptiveStatusBar } from "./src/Components/AdaptiveStatusBar";
export { default as AlertX } from "./src/Components/AlertX";
export * from "./src/Components/Animators/Animator";
export { default as Avatar } from "./src/Components/Avatar";
export * from "./src/Components/Button";
export { default as Button } from "./src/Components/Button";
export * from "./src/Components/Checkbox";
export * from "./src/Components/Divider";
export * from "./src/Components/FlashMessage";
export * from "./src/Components/FormWrapper";
export * from "./src/Components/Grid";
export * from "./src/Components/Locator";
export * from "./src/Components/OTPInput";
export * from "./src/Components/Popup";
export * from "./src/Components/SafeAreaView";
export { default as SelectMenu } from "./src/Components/SelectMenu";
export { default as Spinner } from "./src/Components/Spinner";
export * from "./src/Components/StarRating";
export * from "./src/Components/TextField";
export { default as TextField } from "./src/Components/TextField";
export { default as Typography } from "./src/Components/Typography";

// Animation hooks
export * from "./src/Components/Animators/hooks";

// Others
// export * from "./src/config";
export * from "./src/hooks";
export * from "./src/theme";

const HoddyUI = {
  initialize: initialize,
};

export default HoddyUI;
