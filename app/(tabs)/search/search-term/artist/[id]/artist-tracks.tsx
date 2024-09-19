import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { Loader } from "@/components/loader";
import { Playlist } from "@/components/playlist";
import { colors, fontSizes } from "@/constants/tokens";
import { useGetArtistSongs } from "@/hooks/api/artist/use-get-artist-songs";
import { wp } from "@/lib/utils";

export default function ArtistTracks() {
  const { id } = useLocalSearchParams();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetArtistSongs(id as string);

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

  return (
    <Playlist
      image={data.pages[0].image[2].url}
      title={data.pages[0].title}
      songs={allSongs}
      type={data.pages[0].type}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      footerComponent={renderFooter}
    />
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
