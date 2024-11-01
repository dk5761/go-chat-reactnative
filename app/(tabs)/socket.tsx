// app/index.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";

// Define the structure of a Message
interface Message {
  event_type: string;
  sender_id?: string;
  content: string;
  timestamp?: string;
  receiver_id?: string;
}

export default function ChatScreen() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const serverUrl =
    "ws://37ec-103-111-231-34.ngrok-free.app/api/chat/ws?userID=49016a5f-7be3-4bf8-8d32-6e94612677fb";
  let socket: WebSocket;

  // Set up WebSocket connection
  useEffect(() => {
    socket = new WebSocket(serverUrl);

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      const data: Message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.onclose = (ev) => {
      console.log(ev);
      console.log("Disconnected from WebSocket server");
    };

    console.log({ socket });

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    const messageData: Message = {
      event_type: "send_message",
      receiver_id: "dcf53fb6-0af5-4378-8d3a-896c89de0173",
      content: message,
    };
    console.log({ socket });

    socket.send(JSON.stringify(messageData));
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <Text key={index} style={styles.message}>
            {msg.content}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 10,
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 10,
  },
  message: {
    padding: 10,
    backgroundColor: "#e5e7eb",
    borderRadius: 8,
    marginVertical: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
});
