import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";

import { unknownTrackImageUrl } from "@/constants/images";
import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";
import { PlaylistType } from "@/types";

type LibraryItemProps = {
  playlist: PlaylistType;
};

export function LibraryItem({ playlist }: LibraryItemProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <FastImage
        source={{ uri: playlist.image ?? unknownTrackImageUrl }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{playlist.title}</Text>
        <Text style={styles.subtitle}>Playlist • {playlist.tracks} songs</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(3),
  },
  image: {
    width: wp(16),
    aspectRatio: 1,
    borderRadius: wp(1),
  },
  textContainer: {
    gap: wp(0.5),
  },
  title: {
    color: colors.text.primary,
    fontSize: fontSizes.md,
    fontWeight: "500",
  },
  subtitle: {
    color: colors.text.secondary,
    fontSize: fontSizes.sm,
  },
});
