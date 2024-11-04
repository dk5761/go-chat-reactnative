import { FlatList, StyleSheet, TextInput, View } from "react-native";
import React, { useRef, useState } from "react";
import { GetUsers, useGetUsers, User } from "@/state/queries/users/users";
import Text from "@/components/ui/Text";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Stack } from "expo-router";
import UserCard from "@/components/User/UserCard";
import { SearchInput } from "@/components/ui/SearchInput";
import db from "@/services/db";
import { Users as IUsers, ChatList } from "@/services/db/schema";
import { eq } from "drizzle-orm";

type Props = {};

const Users = (props: Props) => {
  const { styles, theme } = useStyles(stylesheet);
  const [input, setInput] = useState<string>("o");

  const [q, setQ] = useState<string>("");

  const { data, isLoading, isFetching, error } = useGetUsers({
    options: {
      q,
    },
    queryParams: {
      enabled: !!q,
    },
  });

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <SearchInput input={input} setInput={setInput} setQ={setQ} />
        <Text>NoDataFound</Text>
      </View>
    );
  }

  const addUserToChatList = async (user: User) => {
    try {
      // Check if user exists in the Users table
      const existingUser = await db
        .select()
        .from(IUsers)
        .where(eq(IUsers.id, user.id))
        .limit(1);

      if (existingUser.length === 0) {
        // User does not exist, so insert them into the Users table
        await db.insert(IUsers).values({
          id: user.id,
          email: user.email,
          username: user.username,
          created_at: user.created_at,
          last_login: user.last_login,
          updated_at: user.updated_at,
          // Set this according to your requirement or leave it empty if not needed
        });
        console.log(`User ${user.username} added to Users table`);
      }

      // Check if user is in the ChatList
      const chatListEntry = await db
        .select()
        .from(ChatList)
        .where(eq(ChatList.userId, user.id))
        .limit(1);

      if (chatListEntry.length === 0) {
        // User not in ChatList, so add them
        await db.insert(ChatList).values({
          userId: user.id,
          lastMessage: null,
          lastMessageDatetime: null,
        });
        console.log(`User ${user.username} added to ChatList`);
      } else {
        console.log(`User ${user.username} already exists in ChatList`);
      }
    } catch (error) {
      console.error("Error adding user to chat list:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Users",
        }}
      />
      <SearchInput input={input} setInput={setInput} setQ={setQ} />
      <FlatList
        contentContainerStyle={{ gap: theme.spacing[1] }}
        data={data.users}
        renderItem={({ item }) => (
          <UserCard userData={item} addUser={addUserToChatList} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Users;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    padding: theme.margins.md,
    gap: theme.spacing[1],
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    gap: theme.spacing[1],
  },
}));
