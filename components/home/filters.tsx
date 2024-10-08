import { FlatList, StyleSheet, View } from "react-native";

import filters from "@/assets/data/filters";
import { defaultStyles } from "@/constants/styles";
import { wp } from "@/lib/utils";
import { Chip } from "./chip";

const ItemSeparator = () => <View style={styles.separator} />;

type FiltersProps = {
  onFilterChange: (filterId: string) => void;
  activeFilter: string;
};

export function Filters({ onFilterChange, activeFilter }: FiltersProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={filters}
        horizontal
        renderItem={({ item }) => (
          <Chip
            {...item}
            onFilterChange={onFilterChange}
            activeFilter={activeFilter}
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
    ...defaultStyles.paddingHorizontal,
    paddingBottom: wp(4),
  },
  separator: {
    width: wp(2),
  },
});
