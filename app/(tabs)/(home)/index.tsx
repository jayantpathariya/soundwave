import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView } from "react-native";

import filters from "@/assets/data/filters";
import { playlists } from "@/assets/data/playlists";
import { Filters } from "@/components/home/filters";
import { Header } from "@/components/home/header";
import { Playlist } from "@/components/home/playlist";
import { SmallPlaylist } from "@/components/home/small-playlist";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { wp } from "@/lib/utils";

export default function HomeScreen() {
  const [activeFilterId, setActiveFilterId] = useState<string>(filters[0].id);

  const handleFilterChange = (filterId: string) => {
    setActiveFilterId(filterId);
  };

  return (
    <ScrollView>
      <ScreenWrapper>
        <StatusBar style="light" />
        <Header />
        <Filters
          onFilterChange={handleFilterChange}
          activeFilterId={activeFilterId}
        />
        <SmallPlaylist playlists={playlists} title="Recently played" />
        <Playlist
          playlists={playlists}
          title="Mixes for you"
          style={{
            marginVertical: wp(4),
          }}
        />
        <SmallPlaylist playlists={playlists} title="New releases" />
        <Playlist
          playlists={playlists}
          title="Top playlists"
          style={{
            marginTop: wp(4),
          }}
        />
      </ScreenWrapper>
    </ScrollView>
  );
}
