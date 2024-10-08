import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";

import { unknownTrackImageUrl } from "@/constants/images";
import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";

type PlaylistHeaderProps = {
  title: string;
  image: string;
  songCount: number | null;
  type: string;
};

export function PlaylistHeader({
  title,
  image,
  songCount,
  type,
}: PlaylistHeaderProps) {
  return (
    <View style={{ marginBottom: wp(6) }}>
      <View style={styles.infoContainer}>
        <View style={styles.artworkContainer}>
          <FastImage
            source={{ uri: image ?? unknownTrackImageUrl }}
            resizeMode="cover"
            style={styles.artwork}
          />
        </View>
        <View style={styles.infoTextContainer}>
          <Text numberOfLines={1} style={styles.infoTitle}>
            {title}
          </Text>
          <Text style={styles.infoSubtitle}>
            {type} {songCount && <Text>• {songCount} songs</Text>}
          </Text>
        </View>
      </View>
      <View style={styles.controlContainer}>
        <View style={styles.controlButtons}>
          <TouchableOpacity activeOpacity={0.7}>
            <MaterialCommunityIcons
              name="download-circle-outline"
              size={26}
              color={colors.icon.secondary}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons
              name="heart-outline"
              size={26}
              color={colors.icon.secondary}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons
              name="ellipsis-vertical"
              size={26}
              color={colors.icon.secondary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.controlActions}>
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons
              name="shuffle-sharp"
              size={30}
              color={colors.icon.secondary}
            />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} style={styles.playButton}>
            <Ionicons
              name="play-sharp"
              size={26}
              color={colors.background}
              style={{ transform: [{ translateX: wp(0.5) }] }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: wp(6),
  },
  artworkContainer: {
    width: wp(70),
    aspectRatio: 1,
    alignSelf: "center",
    elevation: 5,
  },
  artwork: {
    width: "100%",
    height: "100%",
  },
  infoTextContainer: {
    marginTop: wp(5),
  },
  infoTitle: {
    color: colors.text.primary,
    fontSize: fontSizes.xl,
    fontWeight: "700",
  },
  infoSubtitle: {
    color: colors.text.secondary,
    fontSize: fontSizes.sm,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  controlContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: wp(4),
  },
  controlButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(3),
  },
  playButton: {
    backgroundColor: colors.icon.primary,
    padding: wp(3),
    borderRadius: wp(50),
  },
  controlActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(4),
  },
});
