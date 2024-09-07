import { StatusBar } from "expo-status-bar";

import { ScreenWrapper } from "@/components/screen-wrapper";
import { Browse } from "@/components/search/browse";
import { SearchButton } from "@/components/search/search-button";

export default function SearchScreen() {
  return (
    <ScreenWrapper>
      <StatusBar style="light" />
      <SearchButton />
      <Browse />
    </ScreenWrapper>
  );
}
