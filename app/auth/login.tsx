import { stylesConstants } from "@/common/styleConstants";
import Login from "@/forms/Login";
import useAuthContext from "@/hooks/contextHooks/useAuthContext";
import { login } from "@/state/queries/auth/auth";
import { useMutation } from "@tanstack/react-query";
import { Link, router } from "expo-router";
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
    <SafeAreaView style={styles.container}>
      <Login
        onSubmitCB={(data) => onClickHandler(data)}
        btnText="Login"
        title="Login"
      />
      {/* <Button onPress={onClickHandler} title="Login" /> */}
      <Link
        replace
        href={"/auth/sign-up"}
        style={{
          paddingVertical: stylesConstants.TEN,
        }}
      >
        <Text style={styles.link}>New?? Then Register!!</Text>
      </Link>
    </SafeAreaView>
  );
}

const stylesheet = createStyleSheet((theme, rt) => ({
  container: {
    flex: 1,
    marginTop: rt.insets.top,
    marginBottom: rt.insets.bottom,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    color: theme.colors.primary,
  },
}));
