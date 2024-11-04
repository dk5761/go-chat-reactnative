import React from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "../ui/Text";

interface Message {
  event_type: string;
  sender_id?: string;
  content: string;
  receiver_id?: string;
  id?: string; // Assuming messages have an ID for acknowledgment
  created_at?: string;
}

interface ChatMessageBubbleProps {
  message: Message;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message }) => {
  const isSender =
    message.event_type === "send_message" ||
    message.event_type === "message_acknowledgment";
  const { styles } = useStyles(stylesheet);

  return (
    <View style={[styles.bubble, isSender ? styles.sender : styles.receiver]}>
      <Text style={styles.text} weight="regular" size="xs">
        {message.content}
      </Text>
      <Text style={styles.timestamp} size="xxs">
        {new Date(message.created_at || "").toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // Use 24-hour format
        })}
      </Text>
    </View>
  );
};

export default ChatMessageBubble;

const stylesheet = createStyleSheet((theme) => ({
  bubble: {
    padding: theme.margins.lg,
    borderRadius: theme.spacing[2],
    marginVertical: theme.spacing[1],
    maxWidth: "70%",
    flexDirection: "row",
    gap: theme.spacing[1],
  },
  sender: {
    backgroundColor: theme.colors.secondary,

    alignSelf: "flex-end",
  },
  receiver: {
    backgroundColor: theme.colors.primary,
    alignSelf: "flex-start",
  },
  text: {
    color: theme.colors.textOnPrimary,
  },
  timestamp: {
    color: theme.colors.textOnPrimary,

    // textAlign: "right",
    marginTop: theme.spacing[1],
  },
}));
