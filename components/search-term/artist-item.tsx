import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";

import { Artist } from "@/assets/data/aritst";
import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";

type ArtistItemProps = {
  artist: Artist;
};

export function ArtistItem({ artist }: ArtistItemProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <FastImage source={{ uri: artist.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text numberOfLines={2} style={styles.title}>
          {artist.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: wp(1),
    width: wp(28),
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: wp(50),
  },
  textContainer: {
    width: "100%",
  },
  title: {
    color: colors.text.secondary,
    fontSize: fontSizes.sm,
    fontWeight: "500",
    textAlign: "center",
  },
});
