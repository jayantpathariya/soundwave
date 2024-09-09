import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";

import { Track } from "@/assets/data/tracks";
import { unknownTrackImageUrl } from "@/constants/images";
import { colors, fontSizes } from "@/constants/tokens";
import { usePlayerBackground } from "@/hooks/use-player-background";
import { wp } from "@/lib/utils";
import { LinearGradient } from "expo-linear-gradient";
import { MovingText } from "../moving-text";

type FloatingPlayerProps = {
  track?: Track;
  onPress: () => void;
};

export function FloatingPlayer({ track, onPress }: FloatingPlayerProps) {
  const imageColors = usePlayerBackground(track?.image ?? unknownTrackImageUrl);

  if (!track) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={
          imageColors
            ? [imageColors.average, imageColors.darkMuted]
            : [colors.background, colors.background]
        }
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.player}
          onPress={onPress}
        >
          <View style={styles.infoContainer}>
            <FastImage
              source={{ uri: track.image ?? unknownTrackImageUrl }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <MovingText
                style={styles.title}
                text={track.title}
                animationThreshold={20}
              />
              <Text numberOfLines={1} style={styles.artist}>
                {track.artist}
              </Text>
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={{ marginLeft: wp(4) }}>
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
    bottom: wp(21.5),
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
    flex: 1,
  },
  image: {
    width: wp(14),
    aspectRatio: 1,
  },
  textContainer: {
    flex: 1,
    gap: wp(0.5),
    overflow: "hidden",
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
