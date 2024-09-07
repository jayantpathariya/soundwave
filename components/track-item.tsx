import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";

import { Track } from "@/assets/data/tracks";
import { unknownTrackImageUrl } from "@/constants/images";
import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";

type TrackItemProps = {
  track: Track;
};

export function TrackItem({ track }: TrackItemProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <View style={styles.infoContainer}>
        <FastImage
          source={{ uri: track.image ?? unknownTrackImageUrl }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{track.title}</Text>
          <Text style={styles.artist}>{track.artist}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Ionicons
          name="ellipsis-vertical"
          size={24}
          color={colors.text.secondary}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: wp(4),
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: wp(4),
  },
  image: {
    width: wp(14),
    aspectRatio: 1,
    borderRadius: wp(1),
  },
  textContainer: {
    gap: wp(1),
  },
  title: {
    fontSize: fontSizes.md,
    fontWeight: "500",
    color: colors.text.primary,
  },
  artist: {
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
  },
});
