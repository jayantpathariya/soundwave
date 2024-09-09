import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";

import { Artist } from "@/assets/data/aritst";
import { unknownArtistImageUrl } from "@/constants/images";
import { defaultStyles } from "@/constants/styles";
import { colors, fontSizes } from "@/constants/tokens";
import { usePlayerBackground } from "@/hooks/use-player-background";
import { wp } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

type ArtistInfoProps = {
  artist: Artist;
};

export function ArtistInfo({ artist }: ArtistInfoProps) {
  const imageColors = usePlayerBackground(
    artist?.image ?? unknownArtistImageUrl
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FastImage
          source={{ uri: artist.image ?? unknownArtistImageUrl }}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.overlay} />
        <Text style={styles.text}>{artist.name}</Text>
      </View>
      <LinearGradient
        colors={
          imageColors
            ? [imageColors.average, imageColors.darkMuted]
            : [colors.background, colors.background]
        }
      >
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>10K followers</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity activeOpacity={0.7} style={styles.followBtn}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
            <View style={styles.actionButtons}>
              <TouchableOpacity activeOpacity={0.7}>
                <Ionicons
                  name="shuffle-sharp"
                  size={24}
                  color={colors.icon.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} style={styles.playBtn}>
                <Ionicons
                  name="play-sharp"
                  size={24}
                  color={colors.onPrimary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1 / 0.7,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.transparent,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    position: "absolute",
    bottom: wp(4),
    left: wp(6),
    color: colors.text.primary,
    fontSize: fontSizes.xl,
    fontWeight: "700",
  },
  statsContainer: {
    paddingTop: wp(4),
    paddingBottom: wp(4),
    ...defaultStyles.paddingHorizontal,
  },
  statsText: {
    color: colors.text.secondary,
    fontSize: fontSizes.sm,
    marginBottom: wp(2),
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  followBtn: {
    backgroundColor: colors.white,
    borderRadius: wp(50),
    paddingVertical: wp(2),
    paddingHorizontal: wp(4),
  },
  followText: {
    color: colors.onPrimary,
    fontSize: fontSizes.sm,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(4),
  },
  playBtn: {
    backgroundColor: colors.white,
    borderRadius: wp(50),
    padding: wp(3),
  },
});
