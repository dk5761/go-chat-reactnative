import { Href, Redirect, Stack } from "expo-router";
import useAuthContext from "@/hooks/contextHooks/useAuthContext";

export default function AppLayout() {
  const {
    state: { token },
  } = useAuthContext();

  const isLoggedIn = token;

  if (!isLoggedIn) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href={"../auth/login"} />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />;
}
