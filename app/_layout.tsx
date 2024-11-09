import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "../unistyles";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "@/state/context/auth/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import db from "@/services/db";
import migrations from "@/drizzle/migrations";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { useStyles } from "react-native-unistyles";
import { Toaster } from "sonner-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    console.log("Error in db migrations", error);
  }

  return <Slot />;
}

export default function RootLayoutWithProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <KeyboardProvider>
          <GestureHandlerRootView>
            <RootLayout />
            <Toaster position="top-center" duration={3000} />
          </GestureHandlerRootView>
        </KeyboardProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
