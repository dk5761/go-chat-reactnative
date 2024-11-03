import { FlatList, StyleSheet, TextInput, View } from "react-native";
import React, { useRef, useState } from "react";
import { GetUsers, useGetUsers, User } from "@/state/queries/users/users";
import Text from "@/components/ui/Text";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Stack } from "expo-router";
import UserCard from "@/components/User/UserCard";
import { SearchInput } from "@/components/ui/SearchInput";
import { chatRepository } from "@/services/db/repo/chatRepository";
import { database } from "@/services/db/database";
import { userRepository } from "@/services/db/repo/userRepository";

type Props = {};

const Users = (props: Props) => {
  const { styles, theme } = useStyles(stylesheet);
  const [input, setInput] = useState<string>("o");

  const [q, setQ] = useState<string>("");

  console.log({ q });

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

  const addUserToDb = async (user: User) => {
    try {
      const chatUser = await chatRepository.createChat(database, user, "");
      console.log("User added to chat:", chatUser);
    } catch (error) {
      console.error("Error adding user to chat:", error);
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
          <UserCard
            userData={item}
            onClick={(user: User) => addUserToDb(user)}
          />
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
