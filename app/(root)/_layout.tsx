import { Href, Redirect, Stack } from "expo-router";
import useAuthContext from "@/hooks/contextHooks/useAuthContext";
import { useGetProfile } from "@/state/queries/users/users";
import { WebSocketProvider } from "@/state/context/websocket/websocketContext";
import { wsBaseUrl } from "@/services/api/constants";
import { View } from "react-native";
import Text from "@/components/ui/Text";
import useStorage from "@/services/storage/useStorage";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AppLayout() {
  const {
    state: { token },
  } = useAuthContext();

  const { purgeLocalStorage } = useStorage("token");

  const isLoggedIn = token;

  const { data, isLoading, error } = useGetProfile({});
  const { bottom } = useSafeAreaInsets();

  if (!isLoggedIn) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href={"../auth/login"} />;
  }

  if (isLoading) {
    return (
      <View
        style={{
          justifyContent: "center",
          flex: 1,
          alignItems: "center",
        }}
      >
        <Text>Loading</Text>
      </View>
    );
  }

  if (error) {
    purgeLocalStorage();
    return <Redirect href={"../auth/login"} />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <WebSocketProvider
      serverUrl={`${wsBaseUrl}/api/chat/ws?userID=${data?.id}`}
    >
      <Stack
        screenOptions={{
          contentStyle: {
            paddingBottom: bottom,
          },
        }}
      />
    </WebSocketProvider>
  );
}
