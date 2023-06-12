import { Button, showFlashMessage, useColors } from "@hoddy-ui/core";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
const Display = () => {
  const colors = useColors();

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
      <Button fullWidth title="Hello world" />
    </View>
  );
};
export default Display;
