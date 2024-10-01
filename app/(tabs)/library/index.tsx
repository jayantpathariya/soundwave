import { StatusBar } from "expo-status-bar";

import { Header } from "@/components/library/header";
import { LibraryList } from "@/components/library/library-list";
import { ScreenWrapper } from "@/components/screen-wrapper";

export default function LibraryScreen() {
  const playlists = [
    { id: "1", title: "Liked songs" },
    { id: "2", title: "Downloaded" },
  ];

  return (
    <ScreenWrapper>
      <StatusBar style="light" />
      <Header />
      <LibraryList playlists={playlists} />
    </ScreenWrapper>
  );
}
