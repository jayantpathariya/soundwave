import { FlatList, StyleSheet, View } from "react-native";

import filters from "@/assets/data/filters";
import { wp } from "@/lib/utils";
import { Chip } from "./chip";

const ItemSeparator = () => <View style={styles.separator} />;

export function Filters() {
  return (
    <View style={styles.container}>
      <FlatList
        data={filters}
        horizontal
        renderItem={({ item }) => (
          <Chip title={item.title} selected={item.selected} />
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.title}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: wp(4),
  },
  separator: {
    width: wp(2),
  },
});
