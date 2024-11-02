import { Text } from "react-native";
import { Href, Redirect, SplashScreen, Stack } from "expo-router";
import useAuthContext from "@/hooks/contextHooks/useAuthContext";

export default function AppLayout() {
  const {
    state: { token },
  } = useAuthContext();

  const isLoggedIn = token;

  // You can keep the splash screen open, or render a loading screen like we do here.
  //   if (!isLoading) {
  //     return <Text>Loading...</Text>;
  //   }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (isLoggedIn) {
    return <Redirect href={"/(root)/" as Href} />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
