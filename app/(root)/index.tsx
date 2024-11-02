import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import FloatingButton from "@/components/ui/FloatingButton";
import {
  Entypo,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

type Props = {};

const index = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
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
      <FloatingButton
        mainButtonColor="#3498db"
        secondaryButtonColor="#3498db"
        buttonSize={50}
        radius={100}
        buttonConfigs={[
          {
            icon: <Feather name="user-plus" size={24} color="#FFF" />,
            onPress: () => console.log("Attachment pressed"),
          },
          {
            icon: <FontAwesome name="camera" size={24} color="#FFF" />,
            onPress: () => console.log("Camera pressed"),
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "red",
    position: "relative",
  },
});
