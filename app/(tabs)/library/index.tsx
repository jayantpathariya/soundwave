import { playlists } from "@/assets/data/playlists";
import { Header } from "@/components/library/header";
import { LibraryList } from "@/components/library/library-list";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { StatusBar } from "expo-status-bar";

export default function LibraryScreen() {
  return (
    <ScreenWrapper>
      <StatusBar style="light" />
      <Header />
      <LibraryList playlists={playlists} />
    </ScreenWrapper>
  );
}
