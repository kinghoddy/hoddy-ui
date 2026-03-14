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
import {
  ScaledSheet,
  moderateScale,
  ms,
  verticalScale,
} from "react-native-size-matters";
import { useColors } from "../hooks";
import { TextFieldProps } from "../types";
import { getFontFamily } from "../utility";
import SelectMenu from "./SelectMenu";
import Typography from "./Typography";

const TextField: React.FC<TextFieldProps> = ({
  label,
  keyboardType,
  variant,
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
  gutterBottom = 0,
  end,
  options,
  selectMenuProps,
  ...props
}) => {
  const colors = useColors();
  const [focused, setFocused] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const isDate = type === "date";
  const height =
    moderateScale(variant === "text" ? 50 : 45) *
    (size === "large" ? 1.2 : size === "small" ? 0.8 : 1);

  const labelAnim = useRef(
    new Animated.Value(height / moderateScale(variant === "text" ? 2.5 : 3.2)),
  ).current;

  React.useEffect(() => {
    if (focused || value) {
      Animated.timing(labelAnim, {
        toValue: verticalScale(variant === "text" ? 2 : 4),
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(labelAnim, {
        toValue: height / moderateScale(variant === "text" ? 2.5 : 3.2),
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [focused, value]);
  const styles: any = ScaledSheet.create({
    root: {
      marginBottom: ms(gutterBottom),
      width: "100%",
      ...style,
    },
    container: {
      height: height,
      overflow: "hidden",

      backgroundColor:
        variant === "outlined" || variant === "text"
          ? "#fff0"
          : focused
            ? colors.white[3]
            : colors.white[4],
      flexDirection: "row",
      borderColor: error
        ? colors.error.main
        : focused
          ? colors[color].main
          : colors.textSecondary.main,
      borderWidth: error ? 1 : variant === "outlined" ? (focused ? 2 : 0.5) : 0,
      borderBottomWidth: variant === "text" ? 0.5 : undefined,
      width: "100%",
      borderRadius: variant === "text" ? 0 : rounded ? 30 : 7,
      alignItems: "center",
      ...inputStyles,
    },
    input: {
      fontSize: "14@s",
      flex: 1,
      alignSelf: "stretch",
      paddingLeft: variant === "text" ? 0 : moderateScale(15),
      paddingRight: moderateScale(10),
      paddingTop: "11@vs",
      fontFamily: getFontFamily(400),
      color: disabled ? colors.textSecondary.main : colors.dark.main,
      zIndex: 10,
      // backgroundColor: "#284",
    },
    inputText: {
      fontSize: "14@ms",
      flex: 1,
      paddingLeft: variant === "text" ? 0 : moderateScale(15),
      paddingTop: "13@ms",
    },
    dateContent: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      paddingLeft: variant === "text" ? 0 : moderateScale(15),
      paddingRight: moderateScale(10),
      paddingTop: variant === "text" ? ms(13) : ms(12),
    },
    dateText: {
      fontSize: "14@ms",
      flex: 1,
    },
    datePlaceholder: {
      color: colors.textSecondary.main,
    },
    label: {
      fontFamily: getFontFamily(400),
      position: "absolute",
      left: variant === "text" ? 0 : moderateScale(15),
      fontSize: focused || value ? "10@s" : "13@s",
      color: focused ? colors[color].main : colors.textSecondary.main,
    },
    helperText: {
      paddingHorizontal: "15@s",
      flex: 1,
      color: focused ? colors[color].dark : colors.textSecondary.main,
      paddingTop: "4@ms",
    },
    error: {
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5,
      flexDirection: "row",
      alignItems: "center",
    },
    errorText: {
      fontSize: 12,
      marginLeft: 10,
    },
  });
  const formProps: any =
    type === "email"
      ? {
          textContentType: "emailAddress",
          keyboardType: "email-address",
          autoCapitalize: "none",
          autoCompleteType: "email",
        }
      : type === "number"
        ? {
            keyboardType: "numeric",
          }
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
                  secureTextEntry: true,
                  autoCompleteType: "password",
                  autoCapitalize: "none",
                  textContentType: "password",
                }
              : {};
  const parseDateValue = () => {
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

    const fallback = new Date(value);
    return isNaN(fallback.getTime()) ? new Date() : fallback;
  };

  const handleDateConfirm = (date: Date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;
    onChangeText?.(dateString);
    setDatePickerVisible(false);
  };

  const handleContainerPress = () => {
    if (disabled) return;
    setFocused(true);
    if (isDate) {
      onFocus();
      setDatePickerVisible(true);
    }
  };
  return (
    <>
      <View style={styles.root}>
        <TouchableOpacity
          onPress={handleContainerPress}
          style={styles.container}
        >
          <Animated.Text style={{ ...styles.label, top: labelAnim }}>
            {label}
          </Animated.Text>
          {start}
          {options ? (
            <View
              style={{ flex: 1, alignItems: "center", flexDirection: "row" }}
            >
              {options.find((cur) => cur.value === value)?.start && (
                <View
                  style={{
                    paddingTop: variant !== "outlined" ? ms(13) : 0,
                    paddingRight: 10,
                  }}
                >
                  {options.find((cur) => cur.value === value)?.start}
                </View>
              )}

              <Typography style={styles.inputText}>
                {options.find((cur) => cur.value === value)?.label}
              </Typography>
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
              keyboardType={keyboardType}
              editable={!disabled}
              selectTextOnFocus={!disabled}
              onSubmitEditing={onSubmitEditing}
              placeholderTextColor={colors.textSecondary.main}
              {...formProps}
              {...props}
              style={styles.input}
            />
          )}
          {end && (
            <View
              style={{
                marginRight: 20,
                paddingTop: variant === "text" ? ms(13) : 0,
              }}
            >
              {end}
            </View>
          )}
          {options && (
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
          )}
        </TouchableOpacity>
        {helperText && (
          <Typography
            color="textSecondary"
            style={styles.helperText}
            variant="caption"
          >
            {helperText}
          </Typography>
        )}
        {error && (
          <View style={styles.error}>
            <MaterialIcons name="error" color={colors.error.main} size={16} />
            <Typography style={styles.errorText} color="error">
              {error}
            </Typography>
          </View>
        )}
      </View>
      {options && (
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
      )}
      {isDate && (
        <DateTimePickerModal
          isVisible={datePickerVisible}
          mode="date"
          date={parseDateValue()}
          onConfirm={handleDateConfirm}
          onCancel={() => {
            setDatePickerVisible(false);
            setFocused(false);
          }}
        />
      )}
    </>
  );
};

export const TextField2 = React.forwardRef<TextInput, TextFieldProps>(
  (
    {
      label,
      labelProps,
      keyboardType,
      color = "primary",
      value,
      type,
      placeholder,
      helperText,
      onChangeText,
      onSubmitEditing = () => {},
      onFocus = () => {},
      onBlur = () => {},
      error,
      start,
      rounded,
      disabled = false,
      style = {},
      inputStyles = {},
      gutterBottom = 8,
      end,
      options,
      multiline,
      selectMenuProps,
      ...props
    },
    ref,
  ) => {
    const colors = useColors();
    const [focused, _setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const isDate = type === "date";

    const height = moderateScale(
      multiline ? 50 + (props.numberOfLines || 1) * 18 : 50,
    );

    const setFocused = (value: boolean) => {
      if (options && value) {
        Keyboard.dismiss();
        setTimeout(() => {
          _setFocused(value);
        }, 100);
      } else {
        _setFocused(value);
      }
    };

    const styles: any = ScaledSheet.create({
      root: {
        marginBottom: ms(gutterBottom),
        ...style,
      },
      container: {
        height: height,
        overflow: "hidden",
        flexDirection: "row",
        borderColor: error
          ? colors.error.main
          : focused
            ? colors[color].main
            : colors.white[4],
        borderWidth: error ? 1 : focused ? 2 : 1,
        width: "100%",
        borderRadius: rounded ? 30 : 10,
        alignItems: multiline ? "flex-start" : "center",
        paddingVertical: multiline ? 10 : 0,
        ...inputStyles,
      },
      input: {
        fontSize: "14@s",
        flex: 1,
        alignSelf: "stretch",
        paddingLeft: moderateScale(10),
        paddingRight: moderateScale(10),
        color: disabled ? colors.textSecondary.main : colors.dark.main,
        zIndex: 10,
        // backgroundColor: "#284",
      },
      inputText: {
        fontSize: "14@ms",
        color: colors.dark.main,
        paddingLeft: moderateScale(10),
      },
      placeholder: {
        fontSize: "14@ms",
        color: colors.textSecondary.light,
        paddingLeft: moderateScale(10),
      },
      dateContent: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        paddingHorizontal: moderateScale(10),
        paddingTop: multiline ? 4 : 0,
      },
      dateText: {
        fontSize: "14@ms",
        flex: 1,
      },
      datePlaceholder: {
        color: colors.textSecondary.light,
      },
      label: {},
      helperText: {
        paddingHorizontal: "15@s",
        color: focused ? colors[color].dark : "#fffa",
        paddingTop: "4@ms",
      },
      error: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        flexDirection: "row",
        alignItems: "center",
      },
      errorText: {
        fontSize: 12,
        marginLeft: 10,
      },
    });
    const formProps: any =
      type === "email"
        ? {
            textContentType: "emailAddress",
            keyboardType: "email-address",
            autoCapitalize: "none",
            autoCompleteType: "email",
          }
        : type === "number"
          ? {
              keyboardType: "numeric",
            }
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
    const parseDateValue = () => {
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

      const fallback = new Date(value);
      return isNaN(fallback.getTime()) ? new Date() : fallback;
    };

    const handleDateConfirm = (date: Date) => {
      const year = date.getFullYear();
      const month = `${date.getMonth() + 1}`.padStart(2, "0");
      const day = `${date.getDate()}`.padStart(2, "0");
      const dateString = `${year}-${month}-${day}`;
      onChangeText?.(dateString);
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
    return (
      <>
        <View style={styles.root}>
          {label && (
            <Typography
              variant="body2"
              color="textSecondary"
              gutterBottom={7}
              {...labelProps}
            >
              {label}
            </Typography>
          )}
          <TouchableOpacity
            onPress={handleContainerPress}
            style={styles.container}
          >
            <View style={{ marginTop: multiline ? 5 : 0 }}>{start}</View>

            {options ? (
              <>
                {value ? (
                  <Typography style={styles.inputText}>
                    {options.find((cur) => cur.value === value)?.label}
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
                key={showPassword ? "show" : "hide"}
                keyboardType={keyboardType}
                placeholderTextColor={colors.textSecondary.light}
                editable={!disabled}
                placeholder={placeholder}
                selectTextOnFocus={!disabled}
                onSubmitEditing={onSubmitEditing}
                multiline={multiline}
                extAlignVertical={multiline ? "top" : "center"}
                {...formProps}
                {...props}
                style={styles.input}
              />
            )}

            {end ? (
              <View style={{ marginRight: 20 }}>{end}</View>
            ) : (
              type === "password" && (
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
              )
            )}
          </TouchableOpacity>
          {helperText && (
            <Typography
              color="textSecondary"
              style={styles.helperText}
              variant="caption"
            >
              {helperText}
            </Typography>
          )}
          {error && (
            <View style={styles.error}>
              <MaterialIcons name="error" color={colors.error.main} size={16} />
              <Typography style={styles.errorText} color="error">
                {error}
              </Typography>
            </View>
          )}
        </View>
        {options && (
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
        )}
        {isDate && (
          <DateTimePickerModal
            isVisible={datePickerVisible}
            mode="date"
            date={parseDateValue()}
            onConfirm={handleDateConfirm}
            onCancel={() => {
              setDatePickerVisible(false);
              setFocused(false);
            }}
          />
        )}
      </>
    );
  },
);

export default TextField;
