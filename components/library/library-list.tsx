import { FlatList, StyleSheet, View } from "react-native";

import { defaultStyles } from "@/constants/styles";
import { wp } from "@/lib/utils";
import { Filters } from "./filters";
import { LibraryItem } from "./library-item";

const ItemSeparator = () => <View style={styles.separator} />;

type LibraryListProps = {
  playlists: { id: string; title: string }[];
};

export function LibraryList({ playlists }: LibraryListProps) {
  return (
    <FlatList
      ListHeaderComponent={<Filters />}
      data={playlists}
      renderItem={({ item }) => <LibraryItem playlist={item} />}
      contentContainerStyle={[
        defaultStyles.paddingHorizontal,
        defaultStyles.paddingBottom,
      ]}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    height: wp(3),
  },
});
