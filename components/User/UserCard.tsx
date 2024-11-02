import { View, Text } from "react-native";
import React from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { User } from "@/state/queries/users/users";
import { format } from "date-fns";

type Props = {
  userData: User;
};

const UserCard = ({ userData }: Props) => {
  const { styles } = useStyles(stylesheet);

  const last = format(userData.last_login, "dd-MM-yyyy");

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text>{userData.username}</Text>
      </View>
      <View style={styles.right}>
        <Text>{last}</Text>
      </View>
    </View>
  );
};

export default UserCard;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    padding: theme.margins.xl,
    backgroundColor: theme.colors.background,
    borderRadius: theme.margins.md,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 70,
  },
  left: {},
  right: {},
}));
