import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import { FlatList, Modal, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import { useColors } from "../hooks";
import { SelectMenuProps } from "../types";
import Button from "./Button";
import TextField from "./TextField";
import Typography from "./Typography";

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

  const [search, setSearch] = useState("");
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

  const renderItem = useCallback(
    ({ item }: any) => (
      <TouchableOpacity
        style={{
          ...styles.option,
          backgroundColor:
            item.value === value ? colors.blue.light + "22" : colors.white[2],
        }}
        onPress={() => {
          onChange(item.value);
          if (!disableAutoClose) onClose();
        }}
        key={item.label}
      >
        {item.start && <View style={{ marginRight: 10 }}>{item.start}</View>}
        <View style={{ flex: 1 }}>
          <Typography
            style={{
              color: item.value === value ? colors.blue.light : colors.black[2],
            }}
          >
            {item.label}
          </Typography>
          {item.secondary ? (
            <Typography
              variant="body2"
              style={{
                marginTop: 2,
                color:
                  item.value === value ? colors.blue.light : colors.white[5],
              }}
            >
              {item.secondary}
            </Typography>
          ) : null}
        </View>
        {value === item.value && (
          <MaterialIcons
            name="check"
            color={colors.blue.light}
            size={24}
            style={{ marginLeft: "auto" }}
          />
        )}
      </TouchableOpacity>
    ),
    [value, colors]
  );
  return (
    <Modal visible={open} animationType="slide" onRequestClose={onClose}>
      <View style={styles.root}>
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

            <TextField
              label="Search"
              value={search}
              type="search"
              onChangeText={setSearch}
              variant="outlined"
            />
          </View>
          <FlatList
            removeClippedSubviews
            keyExtractor={(item) => item.value}
            renderItem={renderItem}
            data={options
              .filter((item) =>
                search.length > 1
                  ? item.label.toLowerCase().indexOf(search.toLowerCase()) > -1
                  : item
              )
              .sort((a, b) => a.label.localeCompare(b.label))}
          />
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
