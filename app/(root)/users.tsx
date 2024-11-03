import { FlatList, StyleSheet, TextInput, View } from "react-native";
import React, { useRef, useState } from "react";
import { GetUsers, useGetUsers, User } from "@/state/queries/users/users";
import Text from "@/components/ui/Text";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Stack } from "expo-router";
import UserCard from "@/components/User/UserCard";
import { SearchInput } from "@/components/ui/SearchInput";

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

  const addUserToChatList = (user: User) => {
    console.log(user);
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
