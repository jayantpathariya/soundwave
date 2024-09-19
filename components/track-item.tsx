import { decode } from "html-entities";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";

import { unknownTrackImageUrl } from "@/constants/images";
import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";
import { Song } from "@/types/song";
import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";

type TrackItemProps = {
  track: Song;
  onTrackSelect: (track: Song) => void;
};

export const TrackItem = memo(({ track, onTrackSelect }: TrackItemProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => onTrackSelect(track)}
    >
      <View style={styles.infoContainer}>
        <FastImage
          source={{ uri: track.image[1].url ?? unknownTrackImageUrl }}
          style={styles.image}
        />

        <View style={styles.textContainer}>
          <Text style={styles.title}>{decode(track.title)}</Text>
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
});

TrackItem.displayName = "TrackItem";

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
