import { TextField2 } from "@hoddy-ui/next";
import { ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <>
      {/* Content must scroll beneath the transparent header to show the effect */}
      <ScrollView
        style={{ flex: 1, backgroundColor: "black" }}
        contentContainerStyle={styles.container}
      >
        <TextField2
          label="Search"
          placeholder="Search"
          type="date"
          onChangeText={(text) => console.log(text)}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    // backgroundColor: "red",
  },
});
