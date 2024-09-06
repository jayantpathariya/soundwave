import { FlatList, StyleSheet, Text, View } from "react-native";

import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";
import { PlaylistType } from "@/types";
import { PlaylistCard } from "./playlist-card";

type PlaylistProps = {
  title: string;
  playlists: PlaylistType[];
};

const ItemSeparatorComponent = () => <View style={styles.separator} />;

export function Playlist({ title, playlists }: PlaylistProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaylistCard {...item} />}
        ItemSeparatorComponent={ItemSeparatorComponent}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: wp(3),
  },
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
