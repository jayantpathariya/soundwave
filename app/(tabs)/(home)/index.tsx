import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import { Header } from "@/components/home/header";
import { ScreenWrapper } from "@/components/screen-wrapper";

export default function HomeScreen() {
  return (
    <ScreenWrapper>
      <StatusBar style="light" />
      <Header />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});
