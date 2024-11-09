import { stylesConstants } from "@/common/styleConstants";
import Login from "@/forms/Login";
import useAuthContext from "@/hooks/contextHooks/useAuthContext";
import { login, signUp } from "@/state/queries/auth/auth";
import { useMutation } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import * as Burnt from "burnt";
import { toast } from "sonner-native";

export default function SignUp() {
  const { setAuthToken } = useAuthContext();
  const { styles, theme } = useStyles(stylesheet);

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
      return signUp(email, username, password);
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
          // setAuthToken(data.token);
          router.replace("/");
          Burnt.toast({
            title: "Success", // required
            preset: "done", // or "error", "none", "custom"
            message: "User Registered Successfully", // optional
            haptic: "success", // or "success", "warning", "error"
            duration: 4, // duration in seconds
            shouldDismissByDrag: true,
            from: "bottom", // "top" or "bottom"
            // optionally customize layout
            layout: {
              iconSize: {
                height: 24,
                width: 24,
              },
            },
          });
        },
        onError: (err, as) => {
          console.log({ err, as });
          toast.error("Error", {
            description: err.message,
            styles: {
              toast: {
                backgroundColor: theme.colors.surface,
              },
            },
          });
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <Login
        onSubmitCB={(data) => onClickHandler(data)}
        btnText="Register"
        title="Register"
      />
      {/* <Button onPress={onClickHandler} title="Login" /> */}
      <Link
        replace
        href={"/login"}
        style={{
          paddingVertical: stylesConstants.TEN,
        }}
      >
        <Text style={styles.link}>Have Account? Login then....!!</Text>
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
