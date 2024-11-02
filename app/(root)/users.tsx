import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useGetUsers } from "@/state/queries/users/users";

type Props = {};

const Users = (props: Props) => {
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
    return <View>Loading</View>;
  }

  if (!data) {
    return <View>NoDataFound</View>;
  }

  console.log({ data });

  return (
    <View>
      <Text>Users</Text>
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({});
