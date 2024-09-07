import { FlatList, StyleSheet, Text, View } from "react-native";

import { Artist } from "@/assets/data/aritst";
import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";
import { ArtistItem } from "./artist-item";

type ArtistListProps = {
  title?: string;
  data: Artist[];
};

const ItemSeparator = () => <View style={styles.separator} />;

export function ArtistList({ title, data }: ArtistListProps) {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <FlatList
        data={data}
        horizontal
        renderItem={({ item }) => <ArtistItem artist={item} />}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: wp(4),
  },
  title: {
    color: colors.text.secondary,
    fontSize: fontSizes.xl,
    fontWeight: "500",
    marginBottom: wp(2),
  },
  separator: {
    width: wp(3),
  },
});
