import { useRouter, useSegments } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

import { unknownTrackImageUrl } from "@/constants/images";
import { generatePath } from "@/constants/paths";
import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";
import type { MiniPlaylist } from "@/types/playlist";

type PlaylistCardProps = MiniPlaylist;

export function PlaylistCard({
  id,
  title,
  image,
  description,
}: PlaylistCardProps) {
  const router = useRouter();
  const segments = useSegments();

  const handleNavigate = () => {
    const path = `/${generatePath(segments)}/playlist/[id]`;

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
      <Image
        source={{ uri: image[1].url ?? unknownTrackImageUrl }}
        style={styles.image}
      />
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      <Text numberOfLines={1} style={styles.subtitle}>
        {description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(43.5),
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
  subtitle: {
    color: colors.text.secondary,
    fontSize: fontSizes.xs,
    fontWeight: "500",
  },
});
