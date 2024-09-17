import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import filters from "@/assets/data/filters";
import { Filters } from "@/components/home/filters";
import { Loader } from "@/components/loader";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { SearchAllList } from "@/components/search-term/search-all-list";
import { SearchBar } from "@/components/search-term/search-bar";
import { SearchSongList } from "@/components/search-term/search-song-list";
import { colors, fontSizes } from "@/constants/tokens";
import { useGetSearchAll } from "@/hooks/api/search/use-get-search-all";
import { useGetSearchSongs } from "@/hooks/api/search/use-get-search-songs";
import { useDebounce } from "@/hooks/use-debounce";
import { wp } from "@/lib/utils";

export default function SearchTerm() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>(filters[0].value);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data: searchAllData, isLoading: isSearchAllLoading } =
    useGetSearchAll(debouncedSearchQuery, activeFilter === "all");
  const { data: searchSongsData, isLoading: isSearchSongsLoading } =
    useGetSearchSongs(debouncedSearchQuery, {
      enabled: activeFilter === "songs",
      page: 1,
      limit: 20,
    });

  const handleFilterChange = (value: string) => {
    setActiveFilter(value);
  };

  const renderSearchList = () => {
    if (activeFilter === "all") {
      if (isSearchAllLoading) return <Loader />;

      if (!searchAllData) return <EmptySearchList />;

      return <SearchAllList tracks={searchAllData} />;
    } else if (activeFilter === "songs") {
      if (isSearchSongsLoading) return <Loader />;

      if (!searchSongsData) return <EmptySearchList />;

      return <SearchSongList tracks={searchSongsData.result} />;
    }
  };

  return (
    <ScreenWrapper>
      <StatusBar style="light" />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Filters
        onFilterChange={handleFilterChange}
        activeFilter={activeFilter}
      />
      {renderSearchList()}
    </ScreenWrapper>
  );
}

function EmptySearchList() {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="sad-outline"
        size={wp(12)}
        color={colors.icon.secondary}
      />
      <Text style={styles.emptyText}>No results found</Text>
    </View>
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
