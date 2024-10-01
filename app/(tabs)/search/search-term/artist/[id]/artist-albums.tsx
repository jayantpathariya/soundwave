import { useLocalSearchParams, useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { AlbumCard } from "@/components/artist/album-card";
import { Loader } from "@/components/loader";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { defaultStyles } from "@/constants/styles";
import { colors, fontSizes } from "@/constants/tokens";
import { useGetArtistAlbums } from "@/hooks/api/artist/use-get-artist-albums";
import { wp } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";

export default function ArtistAlbums() {
  const { id, name } = useLocalSearchParams();
  const router = useRouter();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetArtistAlbums(id as string);

  if (isLoading || !data) {
    return <Loader />;
  }

  const allAlbums = data.pages.flatMap((page) => page.albums);

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#999999" />
      </View>
    );
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Albums by {name}</Text>
      </View>
      <FlatList
        data={allAlbums}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item, index }) => (
          <AlbumCard
            item={item}
            index={index}
            onNavigate={() => {
              router.navigate({
                pathname: "/search/search-term/album/[id]",
                params: { id: item.id },
              });
            }}
          />
        )}
        ListFooterComponent={renderFooter}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        numColumns={2}
        contentContainerStyle={styles.cardWrapper}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    ...defaultStyles.paddingHorizontal,
    paddingBottom: wp(4),
    flexDirection: "row",
    alignItems: "center",
    gap: wp(3),
  },
  cardWrapper: {
    ...defaultStyles.paddingBottom,
    ...defaultStyles.paddingHorizontal,
    gap: wp(6),
  },
  headerTitle: {
    color: colors.text.primary,
    fontSize: fontSizes.lg,
    fontWeight: "500",
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
  },
});
