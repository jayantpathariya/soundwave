import { StyleSheet, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";

import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";
import type { Album } from "@/types/album";

export function AlbumCard({
  item,
  index,
  onNavigate,
}: {
  item: Album;
  index: number;
  onNavigate: () => void;
}) {
  const isLeftColumn = index % 2 === 0;

  return (
    <TouchableOpacity
      style={[styles.albumContainer, { marginRight: isLeftColumn ? wp(3) : 0 }]}
      activeOpacity={0.7}
      onPress={onNavigate}
    >
      <FastImage
        source={{
          uri: item.image[2].url,
          priority: "high",
        }}
        style={styles.image}
      />
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  albumContainer: {
    width: wp(44),
    overflow: "hidden",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: wp(1),
  },
  title: {
    color: colors.text.primary,
    fontSize: fontSizes.md,
    marginTop: wp(2),
    textAlign: "center",
  },
});
