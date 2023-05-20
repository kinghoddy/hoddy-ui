import React from "react";
import { View, Modal, TouchableOpacity, ScrollView } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Typography from "./Typography";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "./Button";
import { useColors } from "../hooks";
import { SelectMenuProps } from "../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SelectMenu: React.FC<SelectMenuProps> = ({
  open = false,
  onClose,
  value,
  options = [],
  onChange,
  disableAutoClose = false,
  label,
  secondary,
  helperText,
}) => {
  const colors = useColors();
  const { bottom } = useSafeAreaInsets();
  const styles: any = ScaledSheet.create({
    root: {
      backgroundColor: colors.white[1],
      flex: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: "10@ms",
    },
    header: {
      paddingTop: "80@ms",
      marginBottom: "20@vs",
    },

    options: {},
    option: {
      paddingHorizontal: "10@s",
      paddingVertical: "10@vs",
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: "10@vs",
    },
    footer: {
      paddingBottom: bottom,
      paddingHorizontal: "15@ms",
      paddingTop: "15@ms",
    },
  });
  return (
    <Modal visible={open} animationType="slide" onRequestClose={onClose}>
      <View style={styles.root}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={styles.content}>
              <View style={styles.header}>
                <Typography variant="h5" gutterBottom={5} fontWeight={700}>
                  {label}
                </Typography>
                {helperText ? (
                  <Typography variant="body2" color="textSecondary">
                    {helperText}
                  </Typography>
                ) : null}
              </View>
              <View style={styles.options}>
                {[...options].map((cur) => (
                  <TouchableOpacity
                    style={{
                      ...styles.option,
                      backgroundColor:
                        cur.value === value
                          ? colors.blue.light + "2"
                          : colors.white[2],
                    }}
                    onPress={() => {
                      onChange(cur.value);
                      if (!disableAutoClose) onClose();
                    }}
                    key={cur.label}
                  >
                    <View>
                      <Typography
                        style={{
                          color:
                            cur.value === value
                              ? colors.blue.light
                              : colors.black[2],
                        }}
                      >
                        {cur.label}
                      </Typography>
                      {cur.secondary ? (
                        <Typography
                          variant="body2"
                          style={{
                            marginTop: 2,
                            color:
                              cur.value === value
                                ? colors.blue.light
                                : colors.white[5],
                          }}
                        >
                          {cur.secondary}
                        </Typography>
                      ) : null}
                    </View>
                    {value === cur.value && (
                      <MaterialIcons
                        name="check"
                        color={colors.blue.light}
                        size={24}
                        style={{ marginLeft: "auto" }}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <Button
            color="error"
            variant="outlined"
            fullWidth
            title="Close"
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SelectMenu;
