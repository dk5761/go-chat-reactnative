import React, { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, View, FlatList } from "react-native";
import { Stack, router, useFocusEffect } from "expo-router";
import FloatingButton from "@/components/ui/FloatingButton";
import { Feather, FontAwesome } from "@expo/vector-icons";
import Text from "@/components/ui/Text";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { chatRepository, database } from "@/services/db";
import { User } from "@/services/db/models/user";
import ChatCard from "@/components/Chat/ChatCard";
import { Message } from "@/services/db/models/message";

type Props = {};

const index = (props: Props) => {
  const { styles, theme, breakpoint } = useStyles(stylesheet);
  const [chatData, setChatData] = useState<any[]>([]);

  // Function to fetch chats
  const fetchChats = async () => {
    try {
      const users = await chatRepository.getChatUsers(database);
      console.log("Fetched users:", users);
      setChatData(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Use useFocusEffect to call fetchChats whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchChats();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: () => (
            <Text
              style={{
                fontWeight: "600",
              }}
            >
              Chat
            </Text>
          ),
        }}
      />
      <FlatList
        contentContainerStyle={{ gap: theme.spacing[1] }}
        data={chatData}
        renderItem={({ item }) => <ChatCard userData={item.user} />}
        keyExtractor={(item) => item.user.id}
      />
      <FloatingButton
        mainButtonColor="#3498db"
        secondaryButtonColor="#3498db"
        buttonSize={50}
        radius={100}
        buttonConfigs={[
          {
            icon: <Feather name="user-plus" size={24} color="#FFF" />,
            onPress: () => router.navigate("/users"),
          },
          {
            icon: <FontAwesome name="camera" size={24} color="#FFF" />,
            onPress: () => console.log("Camera pressed"),
          },
        ]}
      />
    </View>
  );
};

export default index;

const stylesheet = createStyleSheet((theme, rt) => ({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: theme.spacing[1],
    paddingBottom: 0,
    backgroundColor: theme.colors.neutral,
    // borderWidth: 3,
    // borderColor: "red",
    marginBottom: rt.insets.bottom,
  },
}));
