import { FlatList, StyleSheet, Text, View } from "react-native";

import { wp } from "@/lib/utils";

import { SearchListItem } from "@/components/search-term/search-list-item";
import { defaultStyles } from "@/constants/styles";
import { ArtistMap } from "@/types/artist";

type TracksProps = {
  artists: ArtistMap[];
};

export function SearchArtistList({ artists }: TracksProps) {
  return (
    <FlatList
      data={artists}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => <SearchListItem item={item} type="artist" />}
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
