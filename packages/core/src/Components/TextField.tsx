import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useColors, useTheme } from "../hooks";
import { ScaledSheet, ms } from "../scaling";
import { TextFieldProps } from "../types";
import { getFontFamily } from "../utility";
import SelectMenu from "./SelectMenu";
import Typography from "./Typography";

export type TextFieldLabelVariant = "floating" | "external";

export interface TextFieldBaseProps extends TextFieldProps {
  labelVariant: TextFieldLabelVariant;
}

const formPropsFromType = (
  type: TextFieldProps["type"],
  showPassword: boolean,
): Record<string, unknown> =>
  type === "email"
    ? {
        textContentType: "emailAddress",
        keyboardType: "email-address",
        autoCapitalize: "none",
        autoCompleteType: "email",
      }
    : type === "number"
      ? { keyboardType: "numeric" }
      : type === "tel"
        ? {
            textContentType: "telephoneNumber",
            keyboardType: "phone-pad",
          }
        : type === "search"
          ? {
              keyboardType: "web-search",
              returnKeyType: "search",
              autoCapitalize: "none",
            }
          : type === "password"
            ? {
                secureTextEntry: !showPassword,
                autoCompleteType: "password",
                autoCapitalize: "none",
                textContentType: "password",
              }
            : {};

function parseDateValue(value: unknown): Date {
  if (!value) return new Date();
  if (value instanceof Date) return value;
  const isoParts = `${value}`.split("-");
  if (isoParts.length === 3) {
    const [year, month, day] = isoParts;
    const parsed = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10),
    );
    if (!isNaN(parsed.getTime())) return parsed;
  }
  const fallback = new Date(value as string);
  return isNaN(fallback.getTime()) ? new Date() : fallback;
}

export const TextFieldBase = React.forwardRef<TextInput, TextFieldBaseProps>(
  (
    {
      label,
      labelProps,
      labelVariant,
      keyboardType,
      variant = "outlined",
      color = "primary",
      value,
      type,
      placeholder = "",
      helperText,
      onChangeText,
      onSubmitEditing = () => {},
      onFocus = () => {},
      onBlur = () => {},
      error,
      start,
      size = "normal",
      rounded,
      disabled = false,
      style = {},
      inputStyles = {},
      gutterBottom,
      end,
      options,
      multiline,
      selectMenuProps,
      labelAlwaysOpen,
      ...props
    },
    ref,
  ) => {
    const colors = useColors();
    const theme = useTheme();
    const [focused, _setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const isDate = type === "date";

    const setFocused = (next: boolean) => {
      if (options && next) {
        Keyboard.dismiss();
        setTimeout(() => _setFocused(next), 100);
      } else {
        _setFocused(next);
      }
    };

    const isFloating = labelVariant === "floating";
    const labelOpen = labelAlwaysOpen || focused || value;

    const baseHeight = ms(
      multiline ? 50 + (props.numberOfLines || 1) * 18 : 50,
    );
    const sizeMultiplier = isFloating
      ? size === "large"
        ? 1.2
        : size === "small"
          ? 0.8
          : 1
      : 1;
    const height = baseHeight * sizeMultiplier;

    const labelAnim = useRef(
      new Animated.Value(height / ms(variant === "text" ? 2.5 : 3.2)),
    ).current;

    React.useEffect(() => {
      if (!isFloating) return;
      if (labelOpen) {
        Animated.timing(labelAnim, {
          toValue: ms(variant === "text" ? 2 : 4),
          duration: 300,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(labelAnim, {
          toValue: height / ms(variant === "text" ? 2.5 : 3.2),
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    }, [isFloating, labelOpen, variant, height]);

    const formProps = formPropsFromType(type, showPassword);

    const handleDateConfirm = (date: Date) => {
      const year = date.getFullYear();
      const month = `${date.getMonth() + 1}`.padStart(2, "0");
      const day = `${date.getDate()}`.padStart(2, "0");
      onChangeText?.(`${year}-${month}-${day}`);
      setDatePickerVisible(false);
      setFocused(false);
    };

    const handleContainerPress = () => {
      if (disabled) return;
      setFocused(true);
      if (isDate) {
        onFocus();
        setDatePickerVisible(true);
      }
    };

    const inputPadding = variant === "text" ? 0 : ms(isFloating ? 15 : 10);
    const containerBorderRadius =
      variant === "text" ? 0 : rounded ? 30 : isFloating ? 7 : 10;
    const datePlaceholderColor = colors.textSecondary.light;

    const styles: any = ScaledSheet.create({
      root: {
        marginBottom: ms(gutterBottom ?? (isFloating ? 0 : 8)),
        width: "100%",
        ...style,
      },
      container: {
        height: height,
        overflow: "hidden",
        flexDirection: "row",
        backgroundColor:
          variant === "outlined" || variant === "text"
            ? "#fff0"
            : focused
              ? colors.white[2] + "dd"
              : colors.white[2],
        borderColor: error
          ? colors.error.main
          : isFloating && focused && variant === "contained"
            ? colors[color].light
            : focused
              ? colors[color].main
              : colors.textSecondary.main,
        borderWidth: error
          ? 1
          : isFloating && focused && variant === "contained"
            ? 1
            : variant === "outlined"
              ? focused
                ? 2
                : 0.5
              : 0,
        borderBottomWidth: variant === "text" ? 0.5 : undefined,
        width: "100%",
        borderRadius: containerBorderRadius,
        alignItems: multiline ? "flex-start" : "center",
        paddingVertical: multiline ? 10 : 0,
        ...inputStyles,
      },
      input: {
        fontSize: "14@ms",
        flex: 1,
        alignSelf: "stretch",
        padding: 0,
        paddingLeft: inputPadding,
        lineHeight: "18@ms",
        paddingRight: ms(10),
        ...(isFloating
          ? { marginTop: "13@ms", fontFamily: getFontFamily(400) }
          : {}),
        color: disabled ? colors.textSecondary.main : colors.dark.main,
        zIndex: 10,
      },
      inputText: {
        fontSize: "14@ms",
        flex: 1,
        paddingLeft: inputPadding,
        ...(isFloating ? { paddingTop: "13@ms" } : {}),
      },
      dateContent: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        paddingLeft: inputPadding,
        paddingRight: ms(10),
        paddingTop: isFloating
          ? variant === "text"
            ? ms(13)
            : ms(12)
          : multiline
            ? 4
            : 0,
      },
      dateText: { fontSize: "14@ms", flex: 1 },
      datePlaceholder: { color: datePlaceholderColor },
      ...(isFloating
        ? {
            contentWrapper: { flex: 1, position: "relative" as const },
            label: {
              fontFamily: getFontFamily(400),
              position: "absolute",
              left: inputPadding,
              fontSize: labelOpen ? "10@ms" : "13@ms",
              color: error
                ? colors.error.main
                : focused
                  ? theme === "dark"
                    ? colors[color].light
                    : colors[color].main
                  : colors.textSecondary.main,
            },
          }
        : {}),
      helperText: {
        paddingHorizontal: "15@ms",
        color: error
          ? colors.error.main
          : focused
            ? theme === "dark"
              ? colors[color].light
              : colors[color].main
            : colors.textSecondary.main,
        paddingTop: "4@ms",
      },
      error: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        flexDirection: "row",
        alignItems: "center",
      },
      errorText: { fontSize: 12, marginLeft: 10, fontWeight: "400" },
      placeholder: {
        fontSize: "14@ms",
        color: colors.textSecondary.light,
        paddingLeft: inputPadding,
      },
    });

    const selectedOption = options?.find((cur) => cur.value === value);
    const showPasswordToggle =
      type === "password" && !end && !options && !isDate;

    return (
      <>
        <View style={styles.root}>
          {isFloating ? null : label != null && label !== "" ? (
            <Typography
              variant="body2"
              color={error ? "error" : "textSecondary"}
              gutterBottom={7}
              {...labelProps}
            >
              {label}
            </Typography>
          ) : null}
          <TouchableOpacity
            onPress={handleContainerPress}
            style={styles.container}
            activeOpacity={1}
          >
            <View style={{ marginTop: multiline && !isFloating ? 5 : 0 }}>
              {start}
            </View>
            {isFloating ? (
              <View style={styles.contentWrapper}>
                {label != null && label !== "" ? (
                  <Animated.Text
                    style={{ ...styles.label, top: labelAnim }}
                    pointerEvents="none"
                  >
                    {label}
                  </Animated.Text>
                ) : null}
                {options ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    {isFloating && selectedOption?.start ? (
                      <View
                        style={{
                          paddingTop: variant !== "outlined" ? ms(13) : 0,
                          paddingRight: 10,
                        }}
                      >
                        {selectedOption.start}
                      </View>
                    ) : null}
                    {selectedOption ? (
                      <Typography style={styles.inputText}>
                        {selectedOption.label}
                      </Typography>
                    ) : (
                      !isFloating && (
                        <Typography style={styles.placeholder}>
                          {placeholder}
                        </Typography>
                      )
                    )}
                    {isFloating ? (
                      <View
                        style={{
                          marginRight: variant === "text" ? 0 : 20,
                          paddingTop: variant === "text" ? ms(13) : 0,
                        }}
                      >
                        <Ionicons
                          name="chevron-down"
                          color={colors.textSecondary.main}
                          size={24}
                        />
                      </View>
                    ) : (
                      <Ionicons
                        name="chevron-down"
                        size={24}
                        style={{ marginLeft: "auto", marginRight: 15 }}
                        color={colors.dark.light}
                      />
                    )}
                  </View>
                ) : isDate ? (
                  <View style={styles.dateContent}>
                    <Typography
                      style={[
                        styles.dateText,
                        !value ? styles.datePlaceholder : undefined,
                      ]}
                      color={value ? "dark" : "textSecondary"}
                    >
                      {value || placeholder}
                    </Typography>
                    <View style={{ marginLeft: 8 }}>
                      {end ?? (
                        <Ionicons
                          name="calendar-outline"
                          size={22}
                          color={colors.textSecondary.main}
                        />
                      )}
                    </View>
                  </View>
                ) : (
                  <TextInput
                    ref={ref}
                    onFocus={() => {
                      onFocus();
                      setFocused(true);
                    }}
                    onBlur={() => {
                      onBlur();
                      setFocused(false);
                    }}
                    value={value}
                    onChangeText={onChangeText}
                    key={
                      type === "password"
                        ? showPassword
                          ? "show"
                          : "hide"
                        : undefined
                    }
                    keyboardType={keyboardType}
                    placeholderTextColor={colors.textSecondary.light}
                    editable={!disabled}
                    placeholder={labelOpen ? placeholder : ""}
                    selectTextOnFocus={!disabled}
                    onSubmitEditing={onSubmitEditing}
                    multiline={multiline}
                    textAlignVertical={multiline ? "top" : "center"}
                    {...formProps}
                    {...props}
                    style={styles.input}
                  />
                )}
              </View>
            ) : options ? (
              <>
                {selectedOption ? (
                  <Typography style={styles.inputText}>
                    {selectedOption.label}
                  </Typography>
                ) : (
                  <Typography style={styles.placeholder}>
                    {placeholder}
                  </Typography>
                )}
                <Ionicons
                  name="chevron-down"
                  size={24}
                  style={{ marginLeft: "auto", marginRight: 15 }}
                  color={colors.dark.light}
                />
              </>
            ) : isDate ? (
              <View style={styles.dateContent}>
                <Typography
                  style={[
                    styles.dateText,
                    !value ? styles.datePlaceholder : undefined,
                  ]}
                  color={value ? "dark" : "textSecondary"}
                >
                  {value || placeholder}
                </Typography>
                <View style={{ marginLeft: 8 }}>
                  {end ?? (
                    <Ionicons
                      name="calendar-outline"
                      size={22}
                      color={colors.textSecondary.main}
                    />
                  )}
                </View>
              </View>
            ) : (
              <TextInput
                ref={ref}
                onFocus={() => {
                  onFocus();
                  setFocused(true);
                }}
                onBlur={() => {
                  onBlur();
                  setFocused(false);
                }}
                value={value}
                onChangeText={onChangeText}
                key={
                  type === "password"
                    ? showPassword
                      ? "show"
                      : "hide"
                    : undefined
                }
                keyboardType={keyboardType}
                placeholderTextColor={colors.textSecondary.light}
                editable={!disabled}
                placeholder={placeholder}
                selectTextOnFocus={!disabled}
                onSubmitEditing={onSubmitEditing}
                multiline={multiline}
                textAlignVertical={multiline ? "top" : "center"}
                {...formProps}
                {...props}
                style={styles.input}
              />
            )}
            {end && !options ? (
              <View
                style={{
                  marginRight: 20,
                  paddingTop: isFloating && variant === "text" ? ms(13) : 0,
                }}
              >
                {end}
              </View>
            ) : showPasswordToggle ? (
              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={24}
                  color={colors.textSecondary.main}
                />
              </TouchableOpacity>
            ) : null}
          </TouchableOpacity>
          {helperText ? (
            <Typography style={styles.helperText} variant="caption">
              {helperText}
            </Typography>
          ) : null}
          {error ? (
            <View style={styles.error}>
              <MaterialIcons name="error" color={colors.error.main} size={16} />
              <Typography
                style={styles.errorText}
                color="error"
                fontWeight={400}
              >
                {error}
              </Typography>
            </View>
          ) : null}
        </View>
        {options ? (
          <SelectMenu
            options={options}
            value={value}
            open={focused}
            onClose={() => setFocused(false)}
            label={label}
            helperText={helperText}
            onChange={onChangeText!}
            {...selectMenuProps}
          />
        ) : null}
        {isDate ? (
          <DateTimePickerModal
            isVisible={datePickerVisible}
            mode="date"
            date={parseDateValue(value)}
            onConfirm={handleDateConfirm}
            onCancel={() => {
              setDatePickerVisible(false);
              setFocused(false);
            }}
          />
        ) : null}
      </>
    );
  },
);

TextFieldBase.displayName = "TextFieldBase";

const TextField = React.forwardRef<TextInput, TextFieldProps>((props, ref) => (
  <TextFieldBase
    {...props}
    ref={ref}
    labelVariant="floating"
    gutterBottom={props.gutterBottom ?? 0}
    placeholder={props.placeholder ?? ""}
  />
));

TextField.displayName = "TextField";

export const TextField2 = React.forwardRef<TextInput, TextFieldProps>(
  (props, ref) => (
    <TextFieldBase
      {...props}
      ref={ref}
      labelVariant="external"
      gutterBottom={props.gutterBottom ?? 8}
    />
  ),
);

TextField2.displayName = "TextField2";

export default TextField;
