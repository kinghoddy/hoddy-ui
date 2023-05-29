import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";

export const OTPInput = () => {
  const [numFields, setNumFields] = useState(1);
  const [inputTexts, setInputTexts] = useState(Array(numFields).fill(""));

  const handleInputChange = (text, index) => {
    const updatedInputTexts = [...inputTexts];
    updatedInputTexts[index] = text;
    setInputTexts(updatedInputTexts);
  };

  const addField = () => {
    setNumFields(numFields + 1);
    setInputTexts([...inputTexts, ""]);
  };

  return (
    <View style={styles.container}>
      {inputTexts.map((inputText, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Enter text ${index + 1}`}
          value={inputText}
          onChangeText={(text) => handleInputChange(text, index)}
        />
      ))}
      <Button title="Add Field" onPress={addField} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
