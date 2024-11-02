import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "@/state/context/auth/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useAuthContext from "@/hooks/contextHooks/useAuthContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000 * 5,
      //retry logic to only refetch a api thrice.
      retry: (count, _) => {
        if (count >= 3) {
          return false;
        }
        return true;
      },
    },
  },
});

function RootLayout() {
  const {
    state: { token },
  } = useAuthContext();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return <Slot initialRouteName="/auth" />;
}

export default function RootLayoutWithProviders() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RootLayout />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
