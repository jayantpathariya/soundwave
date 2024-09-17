import { FlatList, StyleSheet, Text, View } from "react-native";

import { wp } from "@/lib/utils";

import { SearchListItem } from "@/components/search-term/search-list-item";
import { defaultStyles } from "@/constants/styles";
import { SearchPlaylistResultItem } from "@/types/search";

type TracksProps = {
  tracks: SearchPlaylistResultItem[];
};

export function SearchPlaylistList({ tracks }: TracksProps) {
  return (
    <FlatList
      data={tracks}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => <SearchListItem item={item} type="playlist" />}
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
