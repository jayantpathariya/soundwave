import { useRouter, useSegments } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import TrackPlayer from "react-native-track-player";

import { unknownTrackImageUrl } from "@/constants/images";
import { generatePath } from "@/constants/paths";
import { colors, fontSizes } from "@/constants/tokens";
import { useGetSong } from "@/hooks/api/use-get-song";
import { createTrack, wp } from "@/lib/utils";
import type { MiniPlaylist } from "@/types/playlist";
import FastImage from "react-native-fast-image";

type SmallPlaylistCardProps = MiniPlaylist & {
  onPress?: (id: string) => void;
};

export function SmallPlaylistCard({
  title,
  image,
  id,
  type,
  onPress,
}: SmallPlaylistCardProps) {
  const router = useRouter();
  const segments = useSegments();

  const { data: song, isLoading } = useGetSong(id, {
    enabled: type === "song",
  });

  const handleNavigate = async () => {
    if (onPress) {
      onPress(id);
      return;
    }
    let path = "";

    if (type === "album") {
      path = `/${generatePath(segments)}/album/[id]`;
    } else if (type === "playlist") {
      path = `/${generatePath(segments)}/playlist/[id]`;
    } else if (type === "song") {
      if (isLoading || !song) return;

      await TrackPlayer.reset();
      await TrackPlayer.add(createTrack(song[0], title));
      await TrackPlayer.play();

      return;
    }

    router.navigate({
      pathname: path as any,
      params: { id: id },
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={handleNavigate}
    >
      <FastImage
        source={{ uri: image[1].url ?? unknownTrackImageUrl, priority: "high" }}
        style={styles.image}
      />
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(28),
  },
  image: {
    borderRadius: wp(2),
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    color: colors.text.secondary,
    fontSize: fontSizes.sm,
    fontWeight: "500",
    marginTop: wp(1.5),
  },
});
