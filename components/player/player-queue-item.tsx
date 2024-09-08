import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";

import { Track } from "@/assets/data/tracks";
import { unknownTrackImageUrl } from "@/constants/images";
import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";

type PlayerQueueItemProps = {
  track: Track;
  nowPlaying?: boolean;
  index?: number;
};

export function PlayerQueueItem({
  track,
  nowPlaying,
  index,
}: PlayerQueueItemProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      {nowPlaying ? (
        <View style={styles.imageContainer}>
          <FastImage
            source={{
              uri: track.image || unknownTrackImageUrl,
            }}
            style={styles.image}
          />
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Text style={styles.index}>{index}</Text>
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
