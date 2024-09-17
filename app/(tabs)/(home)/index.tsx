import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, View } from "react-native";

import { Header } from "@/components/home/header";
import { Playlist } from "@/components/home/playlist";
import { PlaylistCard } from "@/components/home/playlist-card";
import { SmallPlaylistCard } from "@/components/home/small-playlist-card";
import { Loader } from "@/components/loader";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { defaultStyles } from "@/constants/styles";
import { colors } from "@/constants/tokens";
import { useGetHomeData } from "@/hooks/api/home/use-get-home-data";
import { wp } from "@/lib/utils";

export default function HomeScreen() {
  const { data, isLoading, refetch } = useGetHomeData();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScreenWrapper>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Header />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        refreshing={isLoading}
        onRefresh={refetch}
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
    marginBottom: wp(4),
  },
  playlist: {
    marginBottom: wp(4),
  },
});
