import { Button, UIThemeProvider, useColors } from "@hoddy-ui/core";
import { StyleSheet, View } from "react-native";
import Display from "./display";

export default function App() {
  return (
    <UIThemeProvider>
      <Display />
    </UIThemeProvider>
  );
}
