import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function LibraryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({});
