import {
  OTPInput,
  showFlashMessage,
  Typography,
  useColors,
} from "@hoddy-ui/core";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
const Display = () => {
  const colors = useColors();

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
      <OTPInput value={otp} onChange={setOtp} />
    </View>
  );
};
export default Display;
