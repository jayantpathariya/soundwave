import { Stack } from "expo-router";

export default function SearchTermLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="playlist/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="artist/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="album/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
