import { FlatList, StyleSheet, Text, View } from "react-native";

import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";
import { PlaylistType } from "@/types";
import { SmallPlaylistCard } from "./small-playlist-card";

type SmallPlaylistProps = {
  title: string;
  playlists: PlaylistType[];
};

const ItemSeparatorComponent = () => <View style={styles.separator} />;

export function SmallPlaylist({ title, playlists }: SmallPlaylistProps) {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SmallPlaylistCard {...item} />}
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
