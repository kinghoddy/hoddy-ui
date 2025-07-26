import { UIThemeProvider } from "@hoddy-ui/core";
import Display from "./display";

export default function App() {
  return (
    <UIThemeProvider>
      <Display />
    </UIThemeProvider>
  );
}
