import React from "react";
import { View, Text } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type ChatCardProps = {
  chatData: {
    chatListEntry: {
      userId: string;
    };
    user: {
      username: string;
      email: string;
    };
    lastMessage?: {
      content: string;
      createdAt: string;
    };
  };
};

const ChatCard = ({ chatData }: ChatCardProps) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.card}>
      <Text style={styles.username}>User: {chatData.user.username}</Text>
      <Text style={styles.email}>Email: {chatData.user.email}</Text>
      <Text style={styles.message}>
        Last Message: {chatData.lastMessage?.content || "No messages"}
      </Text>
      <Text style={styles.timestamp}>
        Sent At:{" "}
        {chatData.lastMessage?.createdAt
          ? new Date(chatData.lastMessage.createdAt).toLocaleString()
          : "N/A"}
      </Text>
    </View>
  );
};

export default ChatCard;

const stylesheet = createStyleSheet((theme) => ({
  card: {
    // borderWidth: 2,
    // borderColor: "red",
    padding: theme.spacing[2],
    borderRadius: theme.margins.md,
    backgroundColor: theme.colors.background,

    minWidth: "100%",
  },
  username: {
    fontSize: theme.fontSizes.md,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  email: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.secondary,
    marginTop: theme.spacing[1],
  },
  message: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.secondary,
    marginTop: theme.spacing[1],
  },
  timestamp: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.secondary,
    marginTop: theme.spacing[1],
  },
}));
