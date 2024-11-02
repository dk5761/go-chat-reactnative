import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { Redirect, router, Stack } from "expo-router";
import FloatingButton from "@/components/ui/FloatingButton";
import {
  Entypo,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Text from "@/components/ui/Text";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Props = {};

const index = (props: Props) => {
  const { styles, theme, breakpoint } = useStyles(stylesheet);

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

      <Text>Home</Text>
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
    borderWidth: 3,
    borderColor: "red",
    marginBottom: rt.insets.bottom,
  },
}));
