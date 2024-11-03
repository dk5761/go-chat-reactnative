import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Redirect, router, Stack, useFocusEffect } from "expo-router";
import FloatingButton from "@/components/ui/FloatingButton";
import {
  Entypo,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Text from "@/components/ui/Text";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import db from "@/services/db";
import { ChatList, Messages, Users } from "@/services/db/schema";
import { FlatList } from "react-native";
import ChatCard from "@/components/Card/ChatCard";
import { eq } from "drizzle-orm";

type Props = {};

const index = (props: Props) => {
  const { styles, theme, breakpoint } = useStyles(stylesheet);
  const [chatListData, setChatListData] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchChatListData = async () => {
        try {
          // Fetch data from ChatList, joining with Users and Messages
          const chatListData = await db
            .select({
              user: Users,
              lastMessage: Messages,
            })
            .from(ChatList)
            .leftJoin(Users, eq(ChatList.userId, Users.id))
            .leftJoin(Messages, eq(ChatList.lastMessage, Messages.id));

          console.log("ChatList data with user and message:", chatListData);
          setChatListData(chatListData); // Update state with fetched data
        } catch (error) {
          console.error("Error fetching ChatList data:", error);
        }
      };

      // Fetch data when the screen is focused
      fetchChatListData();
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

          headerTitle: (props) => (
            <Text
              style={{
                fontWeight: "600",
              }}
            >
              Home
            </Text>
          ),
        }}
      />

      <FlatList
        data={chatListData}
        keyExtractor={(item) => item.user.userId}
        renderItem={({ item }) => (
          <ChatCard chatData={item} /> // Render each ChatList entry as a card
        )}
        contentContainerStyle={{
          // padding: theme.spacing[2],
          gap: theme.spacing[1],
        }}
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: rt.insets.bottom,
    backgroundColor: "#e1e1e1",
    // borderWidth: 2,
    // borderColor: "red",
    padding: theme.spacing[1],
    paddingBottom: 0,
  },
}));
