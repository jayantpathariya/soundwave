import { FlatList, StyleSheet, View } from "react-native";

import filters from "@/assets/data/filters";
import { wp } from "@/lib/utils";
import { Chip } from "./chip";

const ItemSeparator = () => <View style={styles.separator} />;

type FiltersProps = {
  onFilterChange: (filterId: string) => void;
  activeFilterId: string;
};

export function Filters({ onFilterChange, activeFilterId }: FiltersProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={filters}
        horizontal
        renderItem={({ item }) => (
          <Chip
            {...item}
            onFilterChange={onFilterChange}
            activeFilterId={activeFilterId}
          />
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
