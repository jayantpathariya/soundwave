import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, View } from "react-native";

import { artists } from "@/assets/data/aritst";
import { playlists } from "@/assets/data/playlists";
import { tracks } from "@/assets/data/tracks";
import { SmallPlaylist } from "@/components/home/small-playlist";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { ArtistList } from "@/components/search-term/artist-list";
import { SearchBar } from "@/components/search-term/search-bar";
import { TrackList } from "@/components/search-term/track-list";
import { defaultStyles } from "@/constants/styles";
import { wp } from "@/lib/utils";

export default function SearchTerm() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ScreenWrapper>
      <StatusBar style="light" />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ScrollView>
        <View style={defaultStyles.container}>
          <TrackList tracks={tracks.slice(15)} />
          <SmallPlaylist
            title="Albums"
            playlists={playlists}
            style={{ marginTop: wp(4) }}
          />
          <ArtistList data={artists} title="Artists" />
          <SmallPlaylist
            title="Playlists"
            playlists={playlists}
            style={{ marginTop: wp(4) }}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
