import React, { useCallback, useEffect, useState } from "react";
import { View, TextInput, FlatList, Text } from "react-native";

import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import db from "@/services/db/index"; // Import your database instance
import { Users, Messages, ChatList } from "@/services/db/schema"; // Import Users and Messages schemas
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { desc, eq, or } from "drizzle-orm";
import { useWebSocket } from "@/state/context/websocket/websocketContext";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import ChatMessageBubble from "@/components/Card/ChatMessage";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function Chat() {
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<any | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);

  const { sendMessage, messages, setMessages } = useWebSocket();

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
          .where(
            or(
              eq(Messages.receiver_id, id as string),
              eq(Messages.sender_id, id as string)
            )
          )
          .orderBy(desc(Messages.created_at));
        setChatMessages(fetchedMessages); // Set the messages in state
      } catch (error) {
        console.error("Error fetching user and messages:", error);
      }
    };

    if (id) {
      fetchUserAndMessages();
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      const updateChatListWithLatestMessage = async () => {
        try {
          const [latestMessage] = await db
            .select({
              id: Messages.id,
              createdAt: Messages.created_at,
            })
            .from(Messages)
            .where(
              or(
                eq(Messages.receiver_id, id as string),
                eq(Messages.sender_id, id as string)
              )
            )
            .orderBy(desc(Messages.created_at))
            .limit(1);

          if (latestMessage) {
            // Update the ChatList entry for the user with the latest message
            await db
              .update(ChatList)
              .set({
                lastMessage: latestMessage.id,
                lastMessageDatetime: latestMessage.createdAt,
              })
              .where(eq(ChatList.userId, id as string));
          }
        } catch (error) {
          console.error("Error updating ChatList with latest message:", error);
        }
      };

      return () => {
        updateChatListWithLatestMessage();
        setMessages([]);
      };
    }, [setMessages])
  );

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
            <ChatMessageBubble message={item} key={item.id} />
          )}
          inverted // To show the latest message at the bottom
          contentContainerStyle={styles.messagesContent}
        />

        <View style={styles.inputContainer}>
          <Input
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            flex={1}
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
    gap: theme.spacing[1],
  },
}));
