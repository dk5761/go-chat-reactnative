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
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";

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
  useDrizzleStudio(db as any);

  useEffect(() => {
    if (success) {
      SplashScreen.hideAsync();
    }
    // deleteLocalStorage();
  }, [success]);

  console.log({
    dbErr: error,
  });

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
