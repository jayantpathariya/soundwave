import { FlatList, StyleSheet, Text, View } from "react-native";

import { wp } from "@/lib/utils";

import { defaultStyles } from "@/constants/styles";
import { SearchAll } from "@/types/search";
import { SearchListItem } from "./search-list-item";

type TracksProps = {
  tracks?: SearchAll[];
};

export function SearchList({ tracks }: TracksProps) {
  return (
    <FlatList
      data={tracks}
      keyExtractor={(item) => `${item.id}-${item.description}`}
      renderItem={({ item }) => <SearchListItem item={item} />}
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
