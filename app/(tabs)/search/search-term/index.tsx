import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import filters from "@/assets/data/filters";
import { Filters } from "@/components/home/filters";
import { Loader } from "@/components/loader";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { SearchBar } from "@/components/search-term/search-bar";
import { SearchList } from "@/components/search-term/search-list";
import { colors, fontSizes } from "@/constants/tokens";
import { useGetSearchAll } from "@/hooks/api/search/use-get-search-all";
import { useDebounce } from "@/hooks/use-debounce";
import { wp } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function SearchTerm() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilterId, setActiveFilterId] = useState<string>(filters[0].id);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data, isLoading } = useGetSearchAll(debouncedSearchQuery);

  const handleFilterChange = (filterId: string) => {
    setActiveFilterId(filterId);
  };

  return (
    <ScreenWrapper>
      <StatusBar style="light" />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Filters
        onFilterChange={handleFilterChange}
        activeFilterId={activeFilterId}
      />
      {isLoading ? (
        <Loader />
      ) : data ? (
        <SearchList tracks={data} />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="sad-outline"
            size={wp(12)}
            color={colors.icon.secondary}
          />
          <Text style={styles.emptyText}>No results found</Text>
        </View>
      )}
      {/* <TrackList tracks={tracks.slice(15)} /> */}

      {/* <SmallPlaylist
            title="Albums"
            playlists={playlists}
            style={{ marginTop: wp(4) }}
          />
          <ArtistList data={artists} title="Artists" />
          <SmallPlaylist
            title="Playlists"
            playlists={playlists}
            style={{ marginTop: wp(4) }}
          /> */}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -wp(25),
  },
  emptyText: {
    fontSize: fontSizes.md,
    color: colors.icon.secondary,
  },
});
