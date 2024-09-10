import { FlatList, StyleSheet, Text, View, ViewStyle } from "react-native";

import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";
import type { MiniPlaylist as PlaylistType } from "@/types/playlist";

type PlaylistProps = {
  title: string;
  playlists: PlaylistType[];
  style?: ViewStyle;
  renderItem: (item: PlaylistType) => JSX.Element;
};

const ItemSeparatorComponent = () => <View style={styles.separator} />;

export function Playlist({
  title,
  playlists,
  style,
  renderItem,
}: PlaylistProps) {
  return (
    <View style={style}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={playlists}
        keyExtractor={(item) => `${item.id}-${item.title}`}
        renderItem={({ item }) => renderItem(item)}
        ItemSeparatorComponent={ItemSeparatorComponent}
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
    marginBottom: wp(3),
  },
  separator: {
    width: wp(3),
  },
});
