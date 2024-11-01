import useAuthContext from "@/hooks/contextHooks/useAuthContext";
import { login } from "@/state/queries/auth/auth";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function SignIn() {
  const { setAuthToken } = useAuthContext();

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return login(email, password);
    },
  });

  const onClickHandler = () => {
    mutation.mutate(
      {
        email: "dk@dk.com",
        password: "dk@123",
      },
      {
        onSuccess: (data) => {
          console.log({ data });
        },
      }
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button onPress={onClickHandler} title="Login" />
    </View>
  );
}
