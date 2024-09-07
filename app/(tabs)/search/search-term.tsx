import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import { ScreenWrapper } from "@/components/screen-wrapper";
import { EmptyResult } from "@/components/search-term/empty-result";
import { SearchBar } from "@/components/search-term/search-bar";

export default function SearchTerm() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ScreenWrapper>
      <StatusBar style="light" />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <EmptyResult />
    </ScreenWrapper>
  );
}
