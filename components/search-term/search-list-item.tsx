import { Ionicons } from "@expo/vector-icons";
import { useRouter, useSegments } from "expo-router";
import { decode } from "html-entities";
import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import TrackPlayer from "react-native-track-player";

import { MovingText } from "@/components/moving-text";
import { unknownTrackImageUrl } from "@/constants/images";
import { generatePath } from "@/constants/paths";
import { colors, fontSizes } from "@/constants/tokens";
import { useGetSong } from "@/hooks/api/use-get-song";
import { createTrack, wp } from "@/lib/utils";
import { SearchAll } from "@/types/search";

type TrackItemProps = {
  item: SearchAll;
  onTrackSelect: (item: SearchAll) => void;
};

export const SearchListItem = memo(
  ({ item, onTrackSelect }: TrackItemProps) => {
    const router = useRouter();
    const segments = useSegments();

    const { data: song, isLoading } = useGetSong(item.id, {
      enabled: item.type === "song",
    });

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
      console.log({ path });

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
          <FastImage
            source={{ uri: item.image[1].url ?? unknownTrackImageUrl }}
            style={styles.image}
          />

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
