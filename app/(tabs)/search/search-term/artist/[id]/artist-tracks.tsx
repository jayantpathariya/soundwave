import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import TrackPlayer from "react-native-track-player";

import { Loader } from "@/components/loader";
import { PlaylistHeader } from "@/components/playlist-header";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { TrackItem } from "@/components/track-item";
import { unknownTrackImageUrl } from "@/constants/images";
import { defaultStyles } from "@/constants/styles";
import { colors, fontSizes } from "@/constants/tokens";
import { useGetArtistSongs } from "@/hooks/api/artist/use-get-artist-songs";
import { usePlayerBackground } from "@/hooks/use-player-background";
import { createTrack, wp } from "@/lib/utils";
import { Song } from "@/types/song";

const ItemSeparator = () => <View style={styles.separator} />;

export default function ArtistTracks() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetArtistSongs(id as string);

  const imageColors = usePlayerBackground(
    data?.pages[0]?.image[1].url ?? unknownTrackImageUrl
  );

  if (isLoading || !data) {
    return <Loader />;
  }

  const allSongs = data.pages.flatMap((page) => page.songs);

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#999999" />
      </View>
    );
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleTrackSelect = async (selectedTrack: Song) => {
    const trackIndex = allSongs.findIndex(
      (track) => track.id === selectedTrack.id
    );

    const beforeTracks = allSongs.slice(0, trackIndex);
    const afterTracks = allSongs.slice(trackIndex + 1);

    await TrackPlayer.reset();
    await TrackPlayer.add(createTrack(selectedTrack));
    await TrackPlayer.add(afterTracks.map(createTrack));
    await TrackPlayer.add(beforeTracks.map(createTrack));

    await TrackPlayer.play();
  };

  const renderItem = ({ item }: { item: Song }) => (
    <TrackItem track={item} onTrackSelect={handleTrackSelect} />
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
      <ScreenWrapper style={[styles.wrapper, defaultStyles.paddingHorizontal]}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.icon.primary} />
          </TouchableOpacity>
          <Text numberOfLines={1} style={styles.headerText}>
            {data.pages[0].title}
          </Text>
        </View>
        <FlatList
          ListHeaderComponent={<PlaylistHeader playlist={data.pages[0]} />}
          data={allSongs}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={defaultStyles.paddingBottom}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      </ScreenWrapper>
    </LinearGradient>
  );
}

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
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
  },
});
