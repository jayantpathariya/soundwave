import { useLocalSearchParams } from "expo-router";

import { Artist } from "@/components/artist/artist";

export default function ArtistScreen() {
  const { id } = useLocalSearchParams();

  return <Artist id={id as string} />;
}
