import { useLocalSearchParams } from "expo-router";

import { Loader } from "@/components/loader";
import { Playlist } from "@/components/playlist";
import { useGetPlaylist } from "@/hooks/api/playlist/use-get-playlist";

export default function PlaylistScreen() {
  const { id } = useLocalSearchParams(); // Get playlist ID

  console.log(id);

  const { data, isLoading } = useGetPlaylist(id as string);

  if (isLoading || !data) {
    return <Loader />;
  }

  return <Playlist playlist={data} />;
}
