import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";

import { playlists } from "@/assets/data/playlists";
import { Filters } from "@/components/home/filters";
import { Header } from "@/components/home/header";
import { Playlist } from "@/components/home/playlist";
import { SmallPlaylist } from "@/components/home/small-playlist";
import { ScreenWrapper } from "@/components/screen-wrapper";

export default function HomeScreen() {
  return (
    <ScrollView>
      <ScreenWrapper>
        <StatusBar style="light" />
        <Header />
        <Filters />
        <SmallPlaylist playlists={playlists} title="Recently played" />
        <Playlist playlists={playlists} title="Mixes for you" />
        <SmallPlaylist playlists={playlists} title="New releases" />
        <Playlist playlists={playlists} title="Top playlists" />
      </ScreenWrapper>
    </ScrollView>
  );
}
