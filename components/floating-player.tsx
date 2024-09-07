import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";

import { Track } from "@/assets/data/tracks";
import { unknownTrackImageUrl } from "@/constants/images";
import { colors, fontSizes } from "@/constants/tokens";
import { usePlayerBackground } from "@/hooks/use-player-background";
import { wp } from "@/lib/utils";
import { LinearGradient } from "expo-linear-gradient";

type FloatingPlayerProps = {
  track?: Track;
};

export function FloatingPlayer({ track }: FloatingPlayerProps) {
  const imageColors = usePlayerBackground(track?.image ?? unknownTrackImageUrl);

  if (!track) {
    return null;
  }

  console.log({ imageColors });

  const colors2 = {
    imageColors: {
      average: "#B89E89",
      darkMuted: "#304848",
      darkVibrant: "#204868",
      dominant: "#D0D0D0",
      lightMuted: "#D0D0D0",
      lightVibrant: "#A8C060",
      muted: "#486878",
      platform: "android",
      vibrant: "#40A050",
    },
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={
          imageColors
            ? [imageColors.average, imageColors.darkMuted]
            : [colors.background]
        }
      >
        <TouchableOpacity activeOpacity={0.9} style={styles.player}>
          <View style={styles.infoContainer}>
            <FastImage
              source={{ uri: track.image ?? unknownTrackImageUrl }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text numberOfLines={1} style={styles.title}>
                {track.title}
              </Text>
              <Text numberOfLines={1} style={styles.artist}>
                {track.artist}
              </Text>
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons
              name={track.isPlaying ? "pause" : "play"}
              size={26}
              color={colors.text.primary}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: wp(21),
    left: 0,
    right: 0,
    marginHorizontal: wp(1.5),
    borderRadius: wp(2),
    overflow: "hidden",
  },
  player: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: wp(2),
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(3),
  },
  image: {
    width: wp(14),
    aspectRatio: 1,
  },
  textContainer: {
    gap: wp(0.5),
  },
  title: {
    color: colors.text.primary,
    fontSize: fontSizes.md,
    fontWeight: "500",
  },
  artist: {
    color: colors.text.secondary,
    fontSize: fontSizes.sm,
  },
});
