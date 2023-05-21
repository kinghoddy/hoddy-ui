import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { startTransition, useRef, useState } from "react";
import { Animated, TextInput, TouchableOpacity, View } from "react-native";
import {
  ScaledSheet,
  moderateScale,
  ms,
  verticalScale,
} from "react-native-size-matters";
import { useColors } from "../hooks";
import { TextFieldProps } from "../types";
import SelectMenu from "./SelectMenu";
import Typography from "./Typography";

const TextField: React.FC<TextFieldProps> = ({
  label,
  keyboardType,
  variant,
  color = "primary",
  value,
  type,
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
  ...props
}) => {
  const colors = useColors();
  const [focused, setFocused] = useState(false);

  const labelAnim = useRef(new Animated.Value(0)).current;

  const height =
    moderateScale(variant === "text" ? 50 : 45) *
    (size === "large" ? 1.2 : size === "small" ? 0.8 : 1);

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
      marginBottom: gutterBottom + "@vs",
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
      color: colors.black[1],
      zIndex: 10,
      // backgroundColor: "#284",
    },
    inputText: {
      fontSize: "14@ms",
      flex: 1,
      paddingLeft: variant === "text" ? 0 : moderateScale(15),
      paddingTop: "13@ms",
    },
    label: {
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
  return (
    <>
      <View style={styles.root}>
        <TouchableOpacity
          onPress={() => setFocused(true)}
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
              {...formProps}
              {...props}
              style={styles.input}
            />
          )}
          {end && <View style={{ marginRight: 20 }}>{end}</View>}
          {options && (
            <View style={{ marginRight: 20 }}>
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
        />
      )}
    </>
  );
};

export const TextField2: React.FC<TextFieldProps> = ({
  label,
  keyboardType,
  variant,
  color = "primary",
  value,
  type,
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
  ...props
}) => {
  const colors = useColors();
  const [focused, _setFocused] = useState(false);

  const labelAnim = useRef(new Animated.Value(0)).current;

  const height = moderateScale(50);

  const setFocused = (value: boolean) => {
    startTransition(() => {
      _setFocused(value);
    });
  };

  React.useEffect(() => {
    if (focused || value) {
      Animated.timing(labelAnim, {
        toValue: verticalScale(5),
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(labelAnim, {
        toValue: height / moderateScale(3),
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [focused, value]);
  const styles: any = ScaledSheet.create({
    root: {
      marginBottom: gutterBottom + "@vs",
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
        : colors.white[5],
      borderWidth: error ? 1 : focused ? 2 : 1,
      width: "100%",
      borderRadius: rounded ? 30 : 10,
      alignItems: "center",
      ...inputStyles,
    },
    input: {
      fontSize: "14@s",
      flex: 1,
      alignSelf: "stretch",
      paddingLeft: moderateScale(10),
      paddingRight: moderateScale(10),
      color: colors.dark.light,
      zIndex: 10,
      // backgroundColor: "#284",
    },
    inputText: {
      fontSize: "14@ms",
      color: colors.dark.light,
      paddingLeft: moderateScale(10),
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
          secureTextEntry: true,
          autoCompleteType: "password",
          autoCapitalize: "none",
          textContentType: "password",
        }
      : {};
  return (
    <>
      <View style={styles.root}>
        {label && (
          <Typography variant="body1" gutterBottom={10} fontWeight={600}>
            {label}
          </Typography>
        )}
        <TouchableOpacity
          onPress={() => setFocused(true)}
          style={styles.container}
        >
          {start}

          {options ? (
            <>
              <Typography style={styles.inputText}>
                {options.find((cur) => cur.value === value)?.label}
              </Typography>
              <Ionicons
                name="chevron-down"
                size={24}
                style={{ marginLeft: "auto", marginRight: 15 }}
                color={colors.dark.light}
              />
            </>
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
              {...formProps}
              {...props}
              style={styles.input}
            />
          )}

          {end && <View style={{ marginRight: 20 }}>{end}</View>}
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
        />
      )}
    </>
  );
};

export default TextField;
