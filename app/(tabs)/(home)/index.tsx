import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { filters } from "@/assets/data/filters";
import { Filters } from "@/components/home/filters";
import { Header } from "@/components/home/header";
import { Playlist } from "@/components/home/playlist";
import { PlaylistCard } from "@/components/home/playlist-card";
import { SmallPlaylistCard } from "@/components/home/small-playlist-card";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { defaultStyles } from "@/constants/styles";
import { colors } from "@/constants/tokens";
import { useGetHomeData } from "@/hooks/api/home/use-get-home-data";
import { wp } from "@/lib/utils";

export default function HomeScreen() {
  const [activeFilterId, setActiveFilterId] = useState<string>(filters[0].id);

  const { data, isLoading } = useGetHomeData();

  const handleFilterChange = (filterId: string) => {
    setActiveFilterId(filterId);
  };

  if (isLoading) {
    return null;
  }

  console.log(data);

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

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (
            item.key === "newTrending" ||
            item.key === "newAlbums" ||
            item.key === "topPlaylists" ||
            item.key === "cityMod"
          ) {
            return (
              <Playlist
                playlists={item.items}
                title={item.title}
                renderItem={(item) => <PlaylistCard {...item} />}
                style={styles.playlist}
              />
            );
          } else {
            return (
              <Playlist
                playlists={item.items}
                title={item.title}
                renderItem={(item) => <SmallPlaylistCard {...item} />}
                style={styles.playlist}
              />
            );
          }
        }}
        style={defaultStyles.container}
        contentContainerStyle={defaultStyles.paddingBottom}
        // ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    ...defaultStyles.paddingHorizontal,
    backgroundColor: colors.background,
  },
  playlist: {
    marginVertical: wp(2),
  },
});
