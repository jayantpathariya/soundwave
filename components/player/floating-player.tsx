import { Ionicons } from "@expo/vector-icons";
import { decode } from "html-entities";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";

import { MovingText } from "@/components/moving-text";
import { unknownTrackImageUrl } from "@/constants/images";
import { colors, fontSizes } from "@/constants/tokens";
import { usePlayerBackground } from "@/hooks/use-player-background";
import { wp } from "@/lib/utils";
import { LinearGradient } from "expo-linear-gradient";
import { memo } from "react";
import TrackPlayer, {
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";

type FloatingPlayerProps = {
  onPress: () => void;
};

export const FloatingPlayer = memo(({ onPress }: FloatingPlayerProps) => {
  const activeTrack = useActiveTrack();
  const { playing } = useIsPlaying();

  const imageColors = usePlayerBackground(
    activeTrack?.artwork ?? unknownTrackImageUrl
  );

  console.log("FloatingPlayer render");

  if (!activeTrack) {
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
              source={{ uri: activeTrack?.artwork ?? unknownTrackImageUrl }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <MovingText
                style={styles.title}
                text={decode(activeTrack?.title) ?? "Unknown Title"}
                animationThreshold={20}
              />
              <Text numberOfLines={1} style={styles.artist}>
                {activeTrack?.artist}
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
