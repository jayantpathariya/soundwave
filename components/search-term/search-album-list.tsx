import { FlatList, StyleSheet, Text, View } from "react-native";

import { wp } from "@/lib/utils";

import { SearchListItem } from "@/components/search-term/search-list-item";
import { defaultStyles } from "@/constants/styles";
import { SearchAlbumsResultItem } from "@/types/search";

type TracksProps = {
  tracks: SearchAlbumsResultItem[];
};

export function SearchAlbumList({ tracks }: TracksProps) {
  return (
    <FlatList
      data={tracks}
      keyExtractor={(item) => `${item.id}-${item.playCount}`}
      renderItem={({ item }) => <SearchListItem item={item} type="album" />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No results found</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: wp(3),
    ...defaultStyles.paddingBottom,
    ...defaultStyles.paddingHorizontal,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 24,
    color: "white",
  },
});
