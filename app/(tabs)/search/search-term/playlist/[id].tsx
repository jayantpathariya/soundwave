import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function PlaylistScreen() {
  const { id } = useLocalSearchParams(); // Get playlist ID

  return (
    <View>
      <Text>Playlist Screen - Playlist ID: {id}</Text>
    </View>
  );
}
