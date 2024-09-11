import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";

import { useLogTrackPlayerState } from "@/hooks/use-log-track-player-state";
import { useSetupTrackPlayer } from "@/hooks/use-setup-track-player";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded,
  });

  useLogTrackPlayerState();

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </PaperProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
