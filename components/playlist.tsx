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

import { unknownTrackImageUrl } from "@/constants/images";
import { defaultStyles } from "@/constants/styles";
import { colors, fontSizes } from "@/constants/tokens";
import { usePlayerBackground } from "@/hooks/use-player-background";
import { createTrack, wp } from "@/lib/utils";
import type { Playlist as PlaylistType } from "@/types/playlist";
import { Song } from "@/types/song";
import { memo } from "react";
import { PlaylistHeader } from "./playlist-header";
import { ScreenWrapper } from "./screen-wrapper";
import { TrackItem } from "./track-item";

type PlaylistProps = {
  playlist: PlaylistType;
};

const ItemSeparator = () => <View style={styles.separator} />;

export const Playlist = memo(({ playlist }: PlaylistProps) => {
  const imageColors = usePlayerBackground(
    playlist.image[1].url ?? unknownTrackImageUrl
  );

  const router = useRouter();

  const handleTrackSelect = async (selectedTrack: Song) => {
    const trackIndex = playlist.songs.findIndex(
      (track) => track.id === selectedTrack.id
    );

    const beforeTracks = playlist.songs.slice(0, trackIndex);
    const afterTracks = playlist.songs.slice(trackIndex + 1);

    await TrackPlayer.reset();
    await TrackPlayer.add(createTrack(selectedTrack));
    await TrackPlayer.add(afterTracks.map(createTrack));
    await TrackPlayer.add(beforeTracks.map(createTrack));

    await TrackPlayer.play();
  };

  return (
    <LinearGradient
      colors={
        imageColors
          ? [imageColors.average, imageColors.darkMuted]
          : [colors.background, colors.background]
      }
      style={{ flex: 1 }}
    >
      <ScreenWrapper style={[styles.wrapper, defaultStyles.paddingHorizontal]}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.icon.primary} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{playlist.title}</Text>
        </View>
        <FlatList
          ListHeaderComponent={<PlaylistHeader playlist={playlist} />}
          data={playlist.songs}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            // <TrackItem
            //   track={item}
            //   onTrackSelect={handleTrackSelect}
            //   isActiveTrack={activeTrack?.id === item.id}
            //   playing={playing}
            // />
            <TrackItem track={item} onTrackSelect={handleTrackSelect} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={defaultStyles.paddingBottom}
        />
      </ScreenWrapper>
    </LinearGradient>
  );
});

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
