import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TrackPlayer from "react-native-track-player";

import { PlaylistHeader } from "@/components/playlist-header";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { TrackItem } from "@/components/track-item";
import { unknownTrackImageUrl } from "@/constants/images";
import { defaultStyles } from "@/constants/styles";
import { colors, fontSizes } from "@/constants/tokens";
import { usePlayerBackground } from "@/hooks/use-player-background";
import { createTrack, wp } from "@/lib/utils";
import { Song } from "@/types/song";
import { memo, useCallback } from "react";

type PlaylistProps = {
  title: string;
  songs: Song[];
  image: string;
  type: string;
  footerComponent?: () => JSX.Element | null;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
};

const ItemSeparator = () => <View style={styles.separator} />;

export const Playlist = memo(
  ({
    title,
    songs,
    image,
    type,
    footerComponent,
    onEndReached,
    onEndReachedThreshold,
  }: PlaylistProps) => {
    const imageColors = usePlayerBackground(image ?? unknownTrackImageUrl);

    const router = useRouter();

    const handleTrackSelect = useCallback(
      async (selectedTrack: Song) => {
        const trackIndex = songs.findIndex(
          (track) => track.id === selectedTrack.id
        );

        const beforeTracks = songs.slice(0, trackIndex);
        const afterTracks = songs.slice(trackIndex + 1);

        await TrackPlayer.reset();
        await TrackPlayer.add(createTrack(selectedTrack));
        await TrackPlayer.add(afterTracks.map(createTrack));
        await TrackPlayer.add(beforeTracks.map(createTrack));

        await TrackPlayer.play();
      },
      [songs]
    );

    return (
      <LinearGradient
        colors={
          imageColors
            ? [imageColors.average, imageColors.darkMuted]
            : [colors.background, colors.background]
        }
        style={{ flex: 1 }}
      >
        <ScreenWrapper
          style={[styles.wrapper, defaultStyles.paddingHorizontal]}
        >
          <View style={styles.header}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={colors.icon.primary}
              />
            </TouchableOpacity>
            <Text numberOfLines={1} style={styles.headerText}>
              {title}
            </Text>
          </View>
          <FlatList
            ListHeaderComponent={
              <PlaylistHeader
                image={image}
                title={title}
                songCount={songs.length}
                type={type}
              />
            }
            data={songs}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
              <TrackItem track={item} onTrackSelect={handleTrackSelect} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={defaultStyles.paddingBottom}
            onEndReached={() => onEndReached?.()}
            onEndReachedThreshold={onEndReachedThreshold}
            ListFooterComponent={footerComponent}
          />
        </ScreenWrapper>
      </LinearGradient>
    );
  }
);

Playlist.displayName = "Playlist";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "transparent",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: wp(5),
    elevation: 5,
  },
  headerText: {
    color: colors.text.primary,
    fontSize: fontSizes.lg,
    fontWeight: "500",
    marginLeft: wp(3),
  },
  separator: {
    height: wp(2),
  },
});
