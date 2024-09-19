import { useLocalSearchParams } from "expo-router";

import { Loader } from "@/components/loader";
import { Playlist } from "@/components/playlist";
import { useGetAlbum } from "@/hooks/api/album/use-get-album";

export default function AlbumScreen() {
  const { id } = useLocalSearchParams(); // Get playlist ID

  console.log(id);

  const { data, isLoading } = useGetAlbum(id as string);

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
