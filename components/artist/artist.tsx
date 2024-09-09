import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { artists } from "@/assets/data/aritst";
import { Track, tracks } from "@/assets/data/tracks";
import { ArtistHeader } from "@/components/artist/artist-header";
import { ArtistInfo } from "@/components/artist/artist-info";
import { TrackItem } from "@/components/track-item";
import { defaultStyles } from "@/constants/styles";
import { colors } from "@/constants/tokens";
import { wp } from "@/lib/utils";

const artist = artists[0];

const ItemSeparator = () => <View style={styles.separator} />;

export default function Artist() {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const renderItem = ({ item }: { item: Track }) => (
    <View style={defaultStyles.paddingHorizontal}>
      <TrackItem track={item} />
    </View>
  );

  return (
    <View style={styles.container}>
      <ArtistHeader scrollY={scrollY} artist={artist} />
      <Animated.FlatList
        ListHeaderComponent={<ArtistInfo artist={artist} />}
        data={tracks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={[defaultStyles.paddingBottom]}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  separator: {
    height: wp(2),
  },
});
