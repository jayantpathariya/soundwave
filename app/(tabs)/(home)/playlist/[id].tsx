import { useLocalSearchParams } from "expo-router";

import { Playlist } from "@/components/playlist";

export default function PlaylistScreen() {
  const { id } = useLocalSearchParams(); // Get playlist ID

  return <Playlist />;
}
