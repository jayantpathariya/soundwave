import { decode } from "html-entities";
import { memo, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import TrackPlayer from "react-native-track-player";

import { unknownTrackImageUrl } from "@/constants/images";
import { colors, fontSizes } from "@/constants/tokens";
import { getSong } from "@/hooks/api/use-get-song";
import { createArtistString, createTrack, wp } from "@/lib/utils";
import { Song } from "@/types/song";
import { Ionicons } from "@expo/vector-icons";

type TrackItemProps = {
  track: Song;
  onTrackSelect?: (track: Song) => void;
  playlistTitle: string;
};

export const TrackItem = memo(
  ({ track, onTrackSelect, playlistTitle }: TrackItemProps) => {
    const handleTrackSelect = useCallback(async () => {
      if (onTrackSelect) {
        onTrackSelect(track);
        return;
      } else {
        const song = await getSong(track.id);

        await TrackPlayer.reset();
        await TrackPlayer.add(createTrack(song[0], playlistTitle));
        await TrackPlayer.play();
      }
    }, [onTrackSelect, track, playlistTitle]);

    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={handleTrackSelect}
      >
        <View style={styles.infoContainer}>
          <FastImage
            source={{ uri: track.image[1].url ?? unknownTrackImageUrl }}
            style={styles.image}
          />

          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {decode(track.title)}
            </Text>
            <Text numberOfLines={1} style={styles.artist}>
              {createArtistString(track.artists.primary)}
            </Text>
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
);

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
