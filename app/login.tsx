import { stylesConstants } from "@/common/styleConstants";
import Login from "@/forms/Login";
import useAuthContext from "@/hooks/contextHooks/useAuthContext";
import { login } from "@/state/queries/auth/auth";
import { useMutation } from "@tanstack/react-query";
import { Link, router, Stack } from "expo-router";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function SignIn() {
  const { setAuthToken } = useAuthContext();

  const mutation = useMutation({
    mutationFn: ({
      email,
      username,
      password,
    }: {
      email: string;
      username: string;
      password: string;
    }) => {
      return login(email, username, password);
    },
  });

  const onClickHandler = ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    mutation.mutate(
      {
        username,
        email,
        password,
      },
      {
        onSuccess: (data) => {
          setAuthToken(data.token);
          router.replace("/");
        },
        onError: (err) => {},
      }
    );
  };

  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Login
        onSubmitCB={(data) => onClickHandler(data)}
        btnText="Login"
        title="Login"
      />
      {/* <Button onPress={onClickHandler} title="Login" /> */}
      <Link
        replace
        href={"/sign-up"}
        style={{
          paddingVertical: stylesConstants.TEN,
        }}
      >
        <Text style={styles.link}>New?? Then Register!!</Text>
      </Link>
    </View>
  );
}

const stylesheet = createStyleSheet((theme, rt) => ({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  link: {
    color: theme.colors.primary,
  },
}));
