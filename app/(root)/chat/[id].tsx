import React, { useEffect, useState } from "react";
import { View, TextInput, Button, FlatList, Text } from "react-native";

import { Stack, useLocalSearchParams } from "expo-router";
import db from "@/services/db/index"; // Import your database instance
import { Users, Messages } from "@/services/db/schema"; // Import Users and Messages schemas
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { desc, eq } from "drizzle-orm";
import { useWebSocket } from "@/state/context/websocket/websocketContext";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

export default function Chat() {
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<any | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);

  const { sendMessage, messages } = useWebSocket();

  const { styles } = useStyles(stylesheet);

  // Fetch user and messages when the component mounts or `id` changes
  useEffect(() => {
    const fetchUserAndMessages = async () => {
      try {
        // Fetch the user based on the provided `id`
        const fetchedUser = await db
          .select()
          .from(Users)
          .where(eq(Users.id, id as string))
          .limit(1);
        setUser(fetchedUser[0]); // Set the user data if available

        // Fetch messages with receiver_id as `id`, sorted by timestamp (latest first)
        const fetchedMessages = await db
          .select()
          .from(Messages)
          .where(eq(Messages.receiverId, id as string))
          .orderBy(desc(Messages.createdAt));
        setChatMessages(fetchedMessages); // Set the messages in state
      } catch (error) {
        console.error("Error fetching user and messages:", error);
      }
    };

    if (id) {
      fetchUserAndMessages();
    }
  }, [id]);

  const handleSendMessage = () => {
    const messageData = {
      event_type: "send_message",
      receiver_id: id as string, // Use the current `id` from the route params
      content: message,
    };
    sendMessage(messageData);
    setMessage("");
  };

  // Combine real-time messages and fetched messages for FlatList
  const allMessages = [...messages, ...chatMessages];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={70}
      behavior="padding"
    >
      <View style={styles.viewContainer}>
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitle: () => (
              <Text style={styles.headerTitle}>
                {user ? user.username : "Chat"}
              </Text>
            ),
          }}
        />

        <FlatList
          data={allMessages}
          keyExtractor={(item, index) => `${item.id || index}`}
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>{item.content}</Text>
            </View>
          )}
          inverted // To show the latest message at the bottom
          contentContainerStyle={styles.messagesContent}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
          />
          <Button title="Send" onPress={handleSendMessage} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  viewContainer: {
    padding: theme.spacing[3],
    flex: 1,
  },
  headerTitle: {
    fontWeight: "600",
    color: theme.colors.primary,
    fontSize: theme.fontSizes.md,
  },
  messagesContent: {
    paddingVertical: theme.spacing[2],
  },
  messageContainer: {
    padding: theme.spacing[2],
    backgroundColor: theme.colors.background,
    borderRadius: theme.margins.lg,
    marginVertical: theme.spacing[1],
    alignSelf: "flex-start",
    maxWidth: "80%",
  },
  messageText: {
    color: theme.colors.secondary,
    fontSize: theme.fontSizes.sm,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacing[1],
  },
  input: {
    flex: 1,
    padding: theme.spacing[2],
    backgroundColor: "white",
    borderRadius: theme.margins.md,
    borderWidth: 1,
    borderColor: "#cbcbcb",
    marginRight: theme.spacing[1],
  },
}));
