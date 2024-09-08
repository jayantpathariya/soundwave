import { unknownTrackImageUrl } from "@/constants/images";
import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";
import { PlaylistType } from "@/types";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

type PlaylistCardProps = PlaylistType;

export function PlaylistCard({ title, image, isPlaying }: PlaylistCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      <Image
        source={{ uri: image ?? unknownTrackImageUrl }}
        style={styles.image}
      />
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      <Text style={styles.subtitle}>Playlist</Text>
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
