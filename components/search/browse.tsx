import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { browse } from "@/assets/data/browse";
import { defaultStyles } from "@/constants/styles";
import { wp } from "@/lib/utils";
import { BrowseCard } from "./browse-card";

const ItemSeparator = () => <View style={styles.separator} />;

export function Browse() {
  return (
    <FlatList
      data={browse}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <BrowseCard {...item} />}
      numColumns={2}
      contentContainerStyle={[
        defaultStyles.paddingHorizontal,
        defaultStyles.paddingBottom,
      ]}
      columnWrapperStyle={styles.columnWrapper}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
}

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: "space-between",
    marginHorizontal: -wp(1.2),
  },
  separator: {
    height: wp(4),
  },
});
