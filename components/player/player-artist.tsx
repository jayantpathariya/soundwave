import { StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";

import { unknownArtistImageUrl } from "@/constants/images";
import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";

type PlayerArtistProps = {
  artistNames?: string;
  artistArtwork?: string;
};

export function PlayerArtist({
  artistNames,
  artistArtwork,
}: PlayerArtistProps) {
  return (
    <View style={styles.container}>
      <FastImage
        source={{ uri: artistArtwork ?? unknownArtistImageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>Artist</Text>
      <View style={styles.bottomText}>
        <Text style={styles.artist}>{artistNames ?? "Unknown Artist"}</Text>
        <Text style={styles.followers}>55.5K followers</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 1.5 / 1,
    marginTop: wp(4),
    borderRadius: wp(2),
    elevation: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: wp(2),
    opacity: 0.8,
  },
  title: {
    position: "absolute",
    top: wp(4),
    left: wp(4),
    color: colors.text.primary,
    fontSize: fontSizes.lg,
    fontWeight: "600",
    marginBottom: wp(4),
  },
  bottomText: {
    position: "absolute",
    bottom: wp(4),
    left: wp(4),
    right: wp(4),
    flexDirection: "column",
    justifyContent: "space-between",
  },
  artist: {
    color: colors.text.primary,
    fontSize: fontSizes.md,
    fontWeight: "600",
    marginBottom: wp(1),
  },
  followers: {
    color: colors.text.primary,
    fontSize: fontSizes.sm,
  },
});
