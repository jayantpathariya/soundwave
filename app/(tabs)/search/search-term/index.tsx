import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import filters from "@/assets/data/filters";
import { Filters } from "@/components/home/filters";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { SearchBar } from "@/components/search-term/search-bar";
import { SearchList } from "@/components/search-term/search-list";
import { useGetSearchAll } from "@/hooks/api/search/use-get-search-all";
import { useDebounce } from "@/hooks/use-debounce";

export default function SearchTerm() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilterId, setActiveFilterId] = useState<string>(filters[0].id);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data, isLoading } = useGetSearchAll(debouncedSearchQuery);

  const handleFilterChange = (filterId: string) => {
    setActiveFilterId(filterId);
  };

  if (isLoading) return null;

  return (
    <ScreenWrapper>
      <StatusBar style="light" />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Filters
        onFilterChange={handleFilterChange}
        activeFilterId={activeFilterId}
      />
      {data && <SearchList tracks={data} />}
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
