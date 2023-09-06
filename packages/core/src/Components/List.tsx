import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { useColors } from "../hooks";
import { ListItemProps, ListItemTextProps, ListProps } from "../types";
import Typography from "./Typography";

export const ListItemText: React.FC<ListItemTextProps> = ({
  primary,
  divider,
  primaryProps = {},
  secondaryProps = {},
  secondary,
  style = {},
}) => {
  const colors = useColors();
  const styles = ScaledSheet.create({
    container: {
      borderBottomColor: colors.white[4],
      borderBottomWidth: divider ? 1 : 0,
      paddingVertical: 0,
      flexGrow: 1,
      ...style,
    },
  });
  return (
    <View style={styles.container}>
      {primary && (
        <Typography
          style={{ alignItems: "center" }}
          variant="body1"
          gutterBottom={2}
          {...primaryProps}
        >
          {primary}
        </Typography>
      )}
      {secondary && (
        <Typography variant="body2" color="textSecondary" {...secondaryProps}>
          {secondary}
        </Typography>
      )}
    </View>
  );
};
export const ListItem: React.FC<ListItemProps> = ({
  link = false,
  divider = false,
  onPress,
  index = 1,
  style = {},
  children,
}) => {
  const colors = useColors();

  const styles: any = ScaledSheet.create({
    root: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: "10@s",
      borderBottomColor: colors.white[4],
      borderBottomWidth: divider ? 1 : 0,
      paddingVertical: "10@vs",
    },
  });
  return (
    <View

    // layout={Layout.springify()}
    // exiting={SlideOutDown.delay(index * 100)}
    // entering={SlideInUp.delay(index * 100)}
    >
      <TouchableOpacity disabled={Boolean(!onPress)} onPress={onPress}>
        <View style={{ ...styles.root, ...style }}>
          {children}
          {link && (
            <MaterialIcons
              color={colors.white[5]}
              style={{ marginLeft: "auto" }}
              name="arrow-forward-ios"
              size={15}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
export const List: React.FC<ListProps> = ({ style = {}, children }) => {
  const styles = ScaledSheet.create({
    root: {
      flex: 1,
      paddingHorizontal: "20@ms",
      ...style,
    },
  });
  return <View style={styles.root}>{children}</View>;
};
