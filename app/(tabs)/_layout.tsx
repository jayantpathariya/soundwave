import { Player } from "@/components/player/player";
import { TabBar } from "@/components/tab-bar";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "Library",
          }}
        />
      </Tabs>
      <Player />
    </>
  );
}
