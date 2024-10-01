import { useRouter, useSegments } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";

import { unknownTrackImageUrl } from "@/constants/images";
import { generatePath } from "@/constants/paths";
import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";

type LibraryItemProps = {
  playlist: { id: string; title: string; image?: string };
};

export function LibraryItem({ playlist }: LibraryItemProps) {
  const router = useRouter();
  const segments = useSegments();

  const handleNavigate = () => {
    const path = `/${generatePath(segments)}/playlist/[id]`;

    router.navigate({
      pathname: path as any,
      params: { id: playlist.id },
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={handleNavigate}
    >
      <FastImage
        source={{ uri: playlist.image ?? unknownTrackImageUrl }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{playlist.title}</Text>
        <Text style={styles.subtitle}>Playlist • {50} songs</Text>
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
