import { Button, useColors } from "@hoddy-ui/core";
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
  return (
    <View style={styles.container}>
      <Button fullWidth title="Hello world" />
    </View>
  );
};
export default Display;
