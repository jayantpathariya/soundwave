import React from "react";
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
import { wp } from "@/lib/utils";
import { Song } from "@/types/song";
import { FlatList } from "react-native-gesture-handler";
import { SmallPlaylistCard } from "../home/small-playlist-card";
import { Loader } from "../loader";
import { TrackItem } from "../track-item";

type ArtistProps = {
  id: string;
};

const ItemSeparator = () => <View style={styles.separator} />;
const VerticalSeparator = () => <View style={styles.verticalSeparator} />;

export function Artist({ id }: ArtistProps) {
  const { data, isLoading } = useGetArtist(id as string);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  if (isLoading || !data) return <Loader />;

  const renderItem = ({ item }: { item: Song }) => (
    <TrackItem
      track={item}
      onTrackSelect={() => console.log("track selected")}
    />
  );

  return (
    <Animated.ScrollView
      style={styles.container}
      contentContainerStyle={defaultStyles.paddingBottom}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    >
      <ArtistHeader scrollY={scrollY} artist={data} />
      <ArtistInfo artist={data} />
      <View style={defaultStyles.paddingHorizontal}>
        <View style={styles.songsTextContainer}>
          <Text style={[styles.title, { marginBottom: wp(4) }]}>Top Songs</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.more}>more</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data.topSongs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemSeparator}
          contentContainerStyle={[]}
          scrollEnabled={false}
        />
      </View>
      <View style={[{ marginTop: wp(6) }, defaultStyles.paddingHorizontal]}>
        <Text style={styles.title}>Top Albums</Text>
        <FlatList
          data={data.topAlbums}
          horizontal
          renderItem={({ item }) => <SmallPlaylistCard {...item} />}
          keyExtractor={(item) => item.id}
          style={styles.horizontalList}
          ItemSeparatorComponent={VerticalSeparator}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={[{ marginTop: wp(6) }, defaultStyles.paddingHorizontal]}>
        <Text style={styles.title}>Singles</Text>
        <FlatList
          data={data.singles}
          horizontal
          // @ts-ignore
          renderItem={({ item }) => <SmallPlaylistCard {...item} />}
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
