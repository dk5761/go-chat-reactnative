import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

type Props = {};

const index = (props: Props) => {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#fff" },
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

      <Text>Home</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
