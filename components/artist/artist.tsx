import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { ArtistHeader } from "@/components/artist/artist-header";
import { ArtistInfo } from "@/components/artist/artist-info";
import { defaultStyles } from "@/constants/styles";
import { colors, fontSizes } from "@/constants/tokens";
import { useGetArtist } from "@/hooks/api/artist/use-get-artist";
import { createTrack, wp } from "@/lib/utils";
import { Song } from "@/types/song";
import { FlatList } from "react-native-gesture-handler";
import TrackPlayer from "react-native-track-player";
import { SmallPlaylistCard } from "../home/small-playlist-card";
import { Loader } from "../loader";
import { TrackItem } from "../track-item";

type ArtistProps = {
  id: string;
};

const ItemSeparator = () => <View style={styles.separator} />;
const VerticalSeparator = () => <View style={styles.verticalSeparator} />;

export function Artist({ id }: ArtistProps) {
  const { data: artist, isLoading } = useGetArtist(id as string);
  const router = useRouter();

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const handleAlbumPress = useCallback(
    (id: string) => {
      router.navigate({
        pathname: "/search/search-term/album/[id]",
        params: { id },
      });
    },
    [router]
  );

  const handleTrackSelect = useCallback(
    async (selectedTrack: Song) => {
      if (!artist || !artist.topSongs) return;

      const trackIndex = artist.topSongs.findIndex(
        (track) => track.id === selectedTrack.id
      );

      const beforeTracks = artist.topSongs.slice(0, trackIndex);
      const afterTracks = artist.topSongs.slice(trackIndex + 1);

      await TrackPlayer.reset();
      await TrackPlayer.add(createTrack(selectedTrack, artist?.name ?? ""));
      await TrackPlayer.add(
        afterTracks.map((track) => createTrack(track, artist?.name ?? ""))
      );
      await TrackPlayer.add(
        beforeTracks.map((track) => createTrack(track, artist?.name ?? ""))
      );

      await TrackPlayer.play();
    },
    [artist]
  );

  const handleMorePress = useCallback(
    async (type: "songs" | "albums") => {
      if (!artist) return;

      if (type === "songs") {
        router.navigate({
          pathname: "/(tabs)/search/search-term/artist/[id]/artist-tracks",
          params: { id: artist.id },
        });
      }
    },
    [artist, router]
  );

  const renderItem = ({ item }: { item: Song }) => (
    <TrackItem
      track={item}
      onTrackSelect={handleTrackSelect}
      playlistTitle={artist?.name ?? ""}
    />
  );

  if (isLoading || !artist) return <Loader />;

  return (
    <Animated.ScrollView
      style={styles.container}
      contentContainerStyle={defaultStyles.paddingBottom}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    >
      <ArtistHeader scrollY={scrollY} artist={artist} />
      <ArtistInfo artist={artist} />
      <View style={defaultStyles.paddingHorizontal}>
        <View style={styles.songsTextContainer}>
          <Text style={[styles.title, { marginBottom: wp(4) }]}>Top Songs</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleMorePress("songs")}
          >
            <Text style={styles.more}>more</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={artist.topSongs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemSeparator}
          contentContainerStyle={[]}
          scrollEnabled={false}
        />
      </View>
      <View style={[{ marginTop: wp(6) }, defaultStyles.paddingHorizontal]}>
        <View style={styles.songsTextContainer}>
          <Text style={styles.title}>Top Albums</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleMorePress("albums")}
          >
            <Text style={styles.more}>more</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={artist.topAlbums}
          horizontal
          renderItem={({ item }) => (
            <SmallPlaylistCard {...item} onPress={handleAlbumPress} />
          )}
          keyExtractor={(item) => item.id}
          style={styles.horizontalList}
          ItemSeparatorComponent={VerticalSeparator}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={[{ marginTop: wp(6) }, defaultStyles.paddingHorizontal]}>
        <Text style={styles.title}>Singles</Text>
        <FlatList
          data={artist.singles}
          horizontal
          renderItem={({ item }) => (
            // @ts-ignore
            <SmallPlaylistCard {...item} onPress={handleAlbumPress} />
          )}
          keyExtractor={(item) => item.id}
          style={styles.horizontalList}
          ItemSeparatorComponent={VerticalSeparator}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  songsTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  more: {
    color: colors.text.secondary,
    fontSize: fontSizes.sm,
  },
  separator: {
    height: wp(2),
  },
  verticalSeparator: {
    width: wp(3),
  },
  title: {
    color: colors.text.primary,
    fontSize: fontSizes.xl,
    fontWeight: "500",
  },
  horizontalList: {
    marginTop: wp(4),
  },
});
