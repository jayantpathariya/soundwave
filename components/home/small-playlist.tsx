import { FlatList, StyleSheet, Text, View, ViewStyle } from "react-native";

import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";
import { PlaylistType } from "@/types";
import { SmallPlaylistCard } from "./small-playlist-card";

type SmallPlaylistProps = {
  title: string;
  playlists: PlaylistType[];
  style?: ViewStyle;
};

const ItemSeparatorComponent = () => <View style={styles.separator} />;

// const ITEM_WIDTH = wp(28);
// const ITEM_SPACING = wp(3);

export function SmallPlaylist({ title, playlists, style }: SmallPlaylistProps) {
  return (
    <View style={style}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SmallPlaylistCard {...item} />}
        ItemSeparatorComponent={ItemSeparatorComponent}
        // snapToInterval={ITEM_WIDTH + ITEM_SPACING}
        // decelerationRate="fast"
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text.secondary,
    fontSize: fontSizes.xl,
    fontWeight: "500",
    marginBottom: wp(2),
  },
  separator: {
    width: wp(3),
  },
});
