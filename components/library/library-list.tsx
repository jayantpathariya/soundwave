import { FlatList, StyleSheet, View } from "react-native";

import { defaultStyles } from "@/constants/styles";
import { wp } from "@/lib/utils";
import { PlaylistType } from "@/types";
import { Filters } from "./filters";
import { LibraryItem } from "./library-item";

type LibraryListProps = {
  playlists: PlaylistType[];
};

const ItemSeparator = () => <View style={styles.separator} />;

export function LibraryList({ playlists }: LibraryListProps) {
  return (
    // <View style={defaultStyles.container}>
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
    // </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: wp(3),
  },
});
