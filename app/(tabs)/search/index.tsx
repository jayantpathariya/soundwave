import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet } from "react-native";

import { ScreenWrapper } from "@/components/screen-wrapper";
import { SearchBar } from "@/components/search/search-bar";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ScreenWrapper>
      <StatusBar style="light" />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});
