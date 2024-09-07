import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { filters } from "@/assets/data/filters";
import { playlists } from "@/assets/data/playlists";
import { Filters } from "@/components/home/filters";
import { Header } from "@/components/home/header";
import { Playlist } from "@/components/home/playlist";
import { SmallPlaylist } from "@/components/home/small-playlist";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { defaultStyles } from "@/constants/styles";
import { colors } from "@/constants/tokens";
import { wp } from "@/lib/utils";

export default function HomeScreen() {
  const [activeFilterId, setActiveFilterId] = useState<string>(filters[0].id);

  const handleFilterChange = (filterId: string) => {
    setActiveFilterId(filterId);
  };

  return (
    <ScreenWrapper>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Header />
        <Filters
          onFilterChange={handleFilterChange}
          activeFilterId={activeFilterId}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={defaultStyles.container}
        contentContainerStyle={defaultStyles.paddingBottom}
      >
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
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    ...defaultStyles.paddingHorizontal,
    backgroundColor: colors.background,
  },
});
