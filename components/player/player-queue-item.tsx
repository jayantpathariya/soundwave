import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import LoaderKit from "react-native-loader-kit";
import { Track } from "react-native-track-player";

import { unknownTrackImageUrl } from "@/constants/images";
import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";

type PlayerQueueItemProps = {
  track: Track;
  nowPlaying?: boolean;
  index?: number;
  OnTrackSelect?: (track: Track) => void;
  isActiveTrack?: boolean;
};

export function PlayerQueueItem({
  index,
  track,
  nowPlaying,
  OnTrackSelect,
  isActiveTrack,
}: PlayerQueueItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={nowPlaying ? 1 : 0.7}
      onPress={() => OnTrackSelect?.(track)}
    >
      {nowPlaying ? (
        <View style={styles.imageContainer}>
          <FastImage
            source={{
              uri: track.artwork || unknownTrackImageUrl,
            }}
            style={styles.image}
          />
        </View>
      ) : (
        <View style={styles.imageContainer}>
          {isActiveTrack ? (
            <LoaderKit
              name="LineScaleParty"
              color={colors.icon.primary}
              style={styles.trackPlayingIcon}
            />
          ) : (
            <Text style={styles.index}>{index}</Text>
          )}
        </View>
      )}
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {track.title}
        </Text>
        <Text numberOfLines={1} style={styles.artist}>
          {track.artist}
        </Text>
      </View>
      {!nowPlaying && (
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons
            name="ellipsis-vertical"
            size={wp(5)}
            color={colors.text.primary}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(3),
  },
  imageContainer: {
    width: wp(14),
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: wp(2),
  },
  index: {
    color: colors.text.primary,
    fontSize: fontSizes.md,
    fontWeight: "500",
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
    fontWeight: "400",
  },
});
