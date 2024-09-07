import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";

import { playlists } from "@/assets/data/playlists";
import { Filters } from "@/components/home/filters";
import { Header } from "@/components/home/header";
import { Playlist } from "@/components/home/playlist";
import { SmallPlaylist } from "@/components/home/small-playlist";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { wp } from "@/lib/utils";

export default function HomeScreen() {
  return (
    <ScrollView>
      <ScreenWrapper>
        <StatusBar style="light" />
        <Header />
        <Filters />
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
