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
import { useWebSocket } from "@/state/context/websocket/websocketContext";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import Button from "@/components/ui/Button";
import * as Burnt from "burnt";

type Props = {};

const index = () => {
  const { styles, theme } = useStyles(stylesheet);

  // const [chatListData, setChatListData] = useState<any[]>([]);

  const { isConnected } = useWebSocket();

  const { data: chatListData } = useLiveQuery(
    db
      .select({
        user: {
          id: Users.id,
          username: Users.username,
          email: Users.email,
        },
        lastMessage: Messages,
      })
      .from(ChatList)
      .leftJoin(Users, eq(ChatList.userId, Users.id))
      .leftJoin(Messages, eq(ChatList.lastMessage, Messages.id))
  );

  // useFocusEffect(
  //   useCallback(() => {
  //     const fetchChatListData = async () => {
  //       try {
  //         const { data } = useLiveQuery(
  //           db
  //             .select({
  //               user: Users,
  //               lastMessage: Messages,
  //             })
  //             .from(ChatList)
  //             .leftJoin(Users, eq(ChatList.userId, Users.id))
  //             .leftJoin(Messages, eq(ChatList.lastMessage, Messages.id))
  //         );
  //         // Fetch data from ChatList, joining with Users and Messages
  //         // const chatListData = await db
  //         //   .select({
  //         //     user: Users,
  //         //     lastMessage: Messages,
  //         //   })
  //         //   .from(ChatList)
  //         //   .leftJoin(Users, eq(ChatList.userId, Users.id))
  //         //   .leftJoin(Messages, eq(ChatList.lastMessage, Messages.id));

  //         setChatListData(data); // Update state with fetched data
  //       } catch (error) {
  //         console.error("Error fetching ChatList data:", error);
  //       }
  //     };

  //     // Fetch data when the screen is focused
  //     fetchChatListData();
  //   }, [])
  // );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: (props) => (
            <Text
              style={{
                fontWeight: "600",
                color: theme.colors.primaryText,
              }}
            >
              Home
            </Text>
          ),
        }}
      />
      {/* <Button
        title="Open Toast"
        onPress={() => {
          Burnt.toast({
            title: "Congrats!", // required

            preset: "done", // or "error", "none", "custom"

            message: "", // optional

            haptic: "success", // or "success", "warning", "error"

            duration: 4, // duration in seconds

            shouldDismissByDrag: true,

            from: "bottom", // "top" or "bottom"

            // optionally customize layout
            layout: {
              iconSize: {
                height: 24,
                width: 24,
              },
            },
          });
        }}
      /> */}

      <FlatList
        data={chatListData}
        keyExtractor={(item) =>
          item.user ? item.user.id : Math.random().toString()
        }
        renderItem={({ item }) => {
          if (item.user !== null) {
            return (
              <ChatCard
                chatData={item.user ? item : ({} as any)}
                disable={!isConnected}
                key={item.user.id}
              /> // Render each ChatList entry as a card
            );
          }

          return null;
        }}
        contentContainerStyle={{
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

    backgroundColor: "#e1e1e1",

    padding: theme.spacing[1],
    paddingBottom: 0,
  },
}));
