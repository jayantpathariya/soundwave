import { Ionicons } from "@expo/vector-icons";
import { useRouter, useSegments } from "expo-router";
import { decode } from "html-entities";
import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import LoaderKit from "react-native-loader-kit";
import TrackPlayer, {
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";

import { MovingText } from "@/components/moving-text";
import { unknownTrackImageUrl } from "@/constants/images";
import { generatePath } from "@/constants/paths";
import { colors, fontSizes } from "@/constants/tokens";
import { useGetSong } from "@/hooks/api/use-get-song";
import { createTrack, wp } from "@/lib/utils";
import { SearchAll } from "@/types/search";

type TrackItemProps = {
  item: SearchAll;
};

export const SearchListItem = memo(({ item }: TrackItemProps) => {
  const activeTrack = useActiveTrack();
  const { playing } = useIsPlaying();
  const router = useRouter();
  const segments = useSegments();

  const { data: song, isLoading } = useGetSong(item.id, {
    enabled: item.type === "song",
  });

  const isActive = activeTrack?.id === item.id;

  const handlePress = async () => {
    let path = "";

    if (item.type === "album") {
      path = `/${generatePath(segments)}/album/[id]`;
    } else if (item.type === "playlist") {
      path = `/${generatePath(segments)}/playlist/[id]`;
    } else if (item.type === "song") {
      if (isLoading || !song) return;

      await TrackPlayer.reset();
      await TrackPlayer.add(createTrack(song[0]));
      await TrackPlayer.play();

      return;
    }

    router.navigate({
      pathname: path as any,
      params: { id: item.id },
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <View style={styles.infoContainer}>
        <View>
          <FastImage
            source={{ uri: item.image[1].url ?? unknownTrackImageUrl }}
            style={[styles.image, isActive && { opacity: 0.6 }]}
          />
          {isActive &&
            (playing ? (
              <LoaderKit
                name="LineScaleParty"
                style={styles.playingIndicator}
              />
            ) : (
              <Ionicons
                name="play"
                size={24}
                color={colors.icon.primary}
                style={styles.pauseIndicator}
              />
            ))}
        </View>

        <View style={styles.textContainer}>
          <MovingText
            style={styles.title}
            text={decode(item.title)}
            animationThreshold={25}
          />
          <Text numberOfLines={1} style={styles.artist}>
            {item.description}
          </Text>
        </View>
      </View>
      <TouchableOpacity>
        {item.type !== "song" ? (
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.icon.secondary}
          />
        ) : (
          <Ionicons
            name="ellipsis-vertical"
            size={24}
            color={colors.text.secondary}
          />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
});

SearchListItem.displayName = "SearchListItem";

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
  playingIndicator: {
    width: wp(5),
    aspectRatio: 1,
    position: "absolute",
    bottom: wp(3.8),
    right: wp(4.5),
  },
  pauseIndicator: {
    position: "absolute",
    bottom: wp(3.8),
    right: wp(4.2),
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
