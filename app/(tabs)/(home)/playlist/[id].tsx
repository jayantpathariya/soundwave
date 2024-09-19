import { useLocalSearchParams } from "expo-router";

import { Loader } from "@/components/loader";
import { Playlist } from "@/components/playlist";
import { useGetPlaylist } from "@/hooks/api/playlist/use-get-playlist";

export default function PlaylistScreen() {
  const { id } = useLocalSearchParams(); // Get playlist ID

  const { data, isLoading } = useGetPlaylist(id as string);

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <Playlist
      image={data.image[2].url}
      title={data.title}
      songs={data.songs}
      type={data.type}
    />
  );
}
