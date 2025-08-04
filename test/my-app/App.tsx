import HoddyUI, { UIThemeProvider } from "@hoddy-ui/core";
import Display from "./display";

HoddyUI.initialize({
  edgeToEdge: true,
});

export default function App() {
  return (
    <UIThemeProvider>
      <Display />
    </UIThemeProvider>
  );
}
