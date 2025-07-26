import {
  Animator,
  Button,
  OTPInput,
  Popup,
  showFlashMessage,
  Typography,
  useColors,
} from "@hoddy-ui/core";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
const Display = () => {
  const colors = useColors();
  const [isOpen, setIsOpen] = useState(false);
  const [otp, setOtp] = useState("");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white[1],
      alignItems: "center",
      justifyContent: "center",
    },
  });

  useEffect(() => {
    showFlashMessage({
      message: "Welcome to the flashmesssage testing 1.0 , lets go!",
      actions: [
        {
          title: "Hello world",
        },
      ],
      title: "Hello world",
      type: "error",
    });
  }, []);
  return (
    <View style={styles.container}>
      <Typography gutterBottom={20} variant="h3">
        Hello hoody ui
      </Typography>
      <Button title="Click me" onPress={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <Animator type="thrownup" duration={1000}>
          <OTPInput value={otp} onChange={setOtp} />
        </Animator>
      )}
      <Popup open={isOpen} onClose={() => setIsOpen(false)}>
        <Typography variant="h3">Hello world</Typography>
      </Popup>
    </View>
  );
};
export default Display;
