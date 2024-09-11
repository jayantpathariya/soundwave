import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { decode } from "html-entities";
import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import TrackPlayer, {
  useActiveTrack,
  useIsPlaying,
  useProgress,
} from "react-native-track-player";

import { MovingText } from "@/components/moving-text";
import { unknownTrackImageUrl } from "@/constants/images";
import { colors, fontSizes } from "@/constants/tokens";
import { useLastActiveTrack } from "@/hooks/use-last-active-track";
import { usePlayerBackground } from "@/hooks/use-player-background";
import { wp } from "@/lib/utils";

type FloatingPlayerProps = {
  onPress: () => void;
};

export const FloatingPlayer = memo(({ onPress }: FloatingPlayerProps) => {
  const activeTrack = useActiveTrack();
  const lastActiveTrack = useLastActiveTrack();
  const { position, duration } = useProgress(1000);
  const { playing } = useIsPlaying();

  const displayedTrack = activeTrack ?? lastActiveTrack;

  const progress = duration > 0 ? (position / duration) * 100 : 0;

  const imageColors = usePlayerBackground(
    displayedTrack?.artwork ?? unknownTrackImageUrl
  );

  if (!displayedTrack) {
    return null;
  }

  const handleTrackPlayPause = async () => {
    if (playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

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
              source={{ uri: displayedTrack?.artwork ?? unknownTrackImageUrl }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <MovingText
                style={styles.title}
                text={decode(displayedTrack?.title) ?? "Unknown Title"}
                animationThreshold={25}
              />
              <Text numberOfLines={1} style={styles.artist}>
                {displayedTrack?.artist}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              marginLeft: wp(4),
              padding: wp(2),
            }}
            onPress={handleTrackPlayPause}
          >
            <Ionicons
              name={playing ? "pause" : "play"}
              size={26}
              color={colors.text.primary}
            />
          </TouchableOpacity>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
});

FloatingPlayer.displayName = "FloatingPlayer";

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
    borderRadius: wp(1.5),
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
  progressBarContainer: {
    position: "absolute",
    bottom: 0,
    left: wp(2),
    right: wp(2),
    height: wp(0.5),
    backgroundColor: colors.transparent,
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.icon.primary,
  },
});
