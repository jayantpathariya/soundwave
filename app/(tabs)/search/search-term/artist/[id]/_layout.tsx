import { Stack } from "expo-router";

export default function ArtistIdLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="artist-tracks"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
