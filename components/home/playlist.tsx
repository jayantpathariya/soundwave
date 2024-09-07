import { FlatList, StyleSheet, Text, View, ViewStyle } from "react-native";

import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";
import { PlaylistType } from "@/types";
import { PlaylistCard } from "./playlist-card";

type PlaylistProps = {
  title: string;
  playlists: PlaylistType[];
  style?: ViewStyle;
};

const ITEM_WIDTH = wp(43.5);
const ITEM_SPACING = wp(3);

const ItemSeparatorComponent = () => <View style={styles.separator} />;

export function Playlist({ title, playlists, style }: PlaylistProps) {
  return (
    <View style={style}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaylistCard {...item} />}
        ItemSeparatorComponent={ItemSeparatorComponent}
        horizontal
        snapToInterval={ITEM_WIDTH + ITEM_SPACING}
        decelerationRate="fast"
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
