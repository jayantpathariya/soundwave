import { decode } from "html-entities";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import LoaderKit from "react-native-loader-kit";
import TrackPlayer, {
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";

import { unknownTrackImageUrl } from "@/constants/images";
import { colors, fontSizes } from "@/constants/tokens";
import { createTrack, wp } from "@/lib/utils";
import { Song } from "@/types/song";
import { Ionicons } from "@expo/vector-icons";
import { MovingText } from "./moving-text";

type TrackItemProps = {
  track: Song;
};

export function TrackItem({ track }: TrackItemProps) {
  const { playing } = useIsPlaying();
  const isActiveTrack = useActiveTrack()?.id === track.id;

  console.log({ isActiveTrack });

  const handlePlayTrack = async () => {
    await TrackPlayer.add([createTrack(track)]);
    await TrackPlayer.play();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={handlePlayTrack}
    >
      <View style={styles.infoContainer}>
        <View>
          <FastImage
            source={{ uri: track.image[1].url ?? unknownTrackImageUrl }}
            style={[styles.image, { opacity: isActiveTrack ? 0.6 : 1 }]}
          />
          {isActiveTrack &&
            (playing ? (
              <LoaderKit
                name="LineScaleParty"
                color={colors.icon.primary}
                style={styles.trackPlayingIcon}
              />
            ) : (
              <Ionicons
                name="play"
                size={24}
                color={colors.icon.primary}
                style={styles.trackPausedIcon}
              />
            ))}
        </View>
        <View style={styles.textContainer}>
          <MovingText
            style={styles.title}
            text={decode(track.title)}
            animationThreshold={25}
          />
          <Text style={styles.artist}>{track.artists.primary[0].name}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Ionicons
          name="ellipsis-vertical"
          size={24}
          color={colors.text.secondary}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: wp(4),
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: wp(4),
  },
  image: {
    width: wp(14),
    aspectRatio: 1,
    borderRadius: wp(1),
  },
  trackPausedIcon: {
    position: "absolute",
    top: wp(3.5),
    left: wp(4),
  },
  trackPlayingIcon: {
    width: wp(5),
    aspectRatio: 1,
    position: "absolute",
    top: wp(4.5),
    left: wp(4),
  },
  textContainer: {
    flex: 1,
    gap: wp(1),
    overflow: "hidden",
  },
  title: {
    fontSize: fontSizes.md,
    fontWeight: "500",
    color: colors.text.primary,
  },
  artist: {
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
  },
});
