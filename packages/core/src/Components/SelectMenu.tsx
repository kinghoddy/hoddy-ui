import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import { useColors } from "../hooks";
import { SelectMenuProps } from "../types";
import { Popup } from "./Popup";
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
  searchEnabled = false,
  searchPlaceholder = "Search",
}) => {
  const colors = useColors();
  const { bottom } = useSafeAreaInsets();

  const [search, setSearch] = useState("");
  const styles: any = ScaledSheet.create({
    header: {
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
            variant="body2"
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
    <Popup
      open={open}
      onClose={onClose}
      title={label}
      disableAutoKeyboardManagement
    >
      <View style={styles.content}>
        <FlatList
          removeClippedSubviews
          keyExtractor={(item) => item.value}
          bounces={false}
          renderItem={renderItem}
          ListHeaderComponent={
            <View style={styles.header}>
              {helperText && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  gutterBottom={5}
                >
                  {helperText}
                </Typography>
              )}
              {searchEnabled && (
                <TextField
                  label={searchPlaceholder}
                  value={search}
                  type="search"
                  onChangeText={setSearch}
                  variant="outlined"
                />
              )}
            </View>
          }
          data={options
            .filter((item) =>
              search.length > 1
                ? item.label.toLowerCase().indexOf(search.toLowerCase()) > -1
                : item
            )
            .sort((a, b) => a.label.localeCompare(b.label))}
        />
      </View>
    </Popup>
  );
};

export default SelectMenu;
