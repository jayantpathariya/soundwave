import { StatusBar } from "expo-status-bar";

import { Filters } from "@/components/home/filters";
import { Header } from "@/components/home/header";
import { ScreenWrapper } from "@/components/screen-wrapper";

export default function HomeScreen() {
  return (
    <ScreenWrapper>
      <StatusBar style="light" />
      <Header />
      <Filters />
    </ScreenWrapper>
  );
}
