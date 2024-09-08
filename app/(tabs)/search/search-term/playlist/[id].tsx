import { Playlist } from "@/components/playlist";
import { useLocalSearchParams } from "expo-router";

export default function PlaylistScreen() {
  const { id } = useLocalSearchParams(); // Get playlist ID

  return <Playlist />;
}
