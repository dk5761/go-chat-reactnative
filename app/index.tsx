import { stylesConstants } from "@/common/styleConstants";
import Login from "@/forms/Login";
import useAuthContext from "@/hooks/contextHooks/useAuthContext";
import { login } from "@/state/queries/auth/auth";
import { useMutation } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

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
          router.replace("/(app)/");
        },
        onError: (err) => {},
      }
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Login onSubmitCB={(data) => onClickHandler(data)} btnText="Login" />
      {/* <Button onPress={onClickHandler} title="Login" /> */}
      <Link
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

const styles = StyleSheet.create({
  link: {
    color: "#007AFF",
  },
});
