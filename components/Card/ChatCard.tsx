import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type ChatCardProps = {
  chatData: {
    user: {
      id: string;
      username: string;
      email: string;
    };
    lastMessage?: {
      content: string | null;
      createdAt: string | null;
    };
  };
  disable: boolean;
};

const ChatCard = ({ chatData, disable }: ChatCardProps) => {
  const { styles } = useStyles(stylesheet);

  return (
    <TouchableOpacity
      onPress={() => router.push(`./chat/${chatData.user.id}`)}
      disabled={disable}
    >
      <View style={styles.card}>
        <View>
          <Text style={styles.username}> {chatData.user.username}</Text>
          <Text style={styles.message}>
            {chatData.lastMessage?.content || "--"}
          </Text>
        </View>

        {chatData.lastMessage?.createdAt ? (
          <Text style={styles.timestamp}>
            Sent At:{new Date(chatData.lastMessage.createdAt).toLocaleString()}
          </Text>
        ) : (
          ""
        )}
      </View>
    </TouchableOpacity>
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
    color: theme.colors.primary,
  },
  email: {
    color: theme.colors.secondary,
    marginTop: theme.spacing[1],
  },
  message: {
    color: theme.colors.secondary,
    marginTop: theme.spacing[1],
  },
  timestamp: {
    color: theme.colors.secondary,
    marginTop: theme.spacing[1],
  },
}));
