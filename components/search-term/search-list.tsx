import { FlatList, StyleSheet } from "react-native";

import { wp } from "@/lib/utils";

import { defaultStyles } from "@/constants/styles";
import { SearchAll } from "@/types/search";
import { SearchListItem } from "./search-list-item";

type TracksProps = {
  tracks: SearchAll[];
};

export function SearchList({ tracks }: TracksProps) {
  return (
    <FlatList
      data={tracks}
      keyExtractor={(item) => `${item.id}-${item.title}`}
      renderItem={({ item }) => (
        <SearchListItem item={item} onTrackSelect={() => {}} />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: wp(3),
    ...defaultStyles.paddingBottom,
    ...defaultStyles.paddingHorizontal,
  },
});
