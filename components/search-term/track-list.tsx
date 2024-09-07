import { StyleSheet, Text, View } from "react-native";

import { Track } from "@/assets/data/tracks";
import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";
import { TrackItem } from "../track-item";

type TracksProps = {
  tracks: Track[];
};

export function TrackList({ tracks }: TracksProps) {
  return (
    <View>
      <Text style={styles.title}>Songs</Text>
      <View style={styles.tracksContainer}>
        {tracks.map((track) => (
          <TrackItem key={track.id} track={track} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text.secondary,
    fontSize: fontSizes.xl,
    fontWeight: "500",
    marginBottom: wp(2),
  },
  tracksContainer: {
    gap: wp(3),
  },
});
