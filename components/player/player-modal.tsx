import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { forwardRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Track } from "@/assets/data/tracks";
import { unknownTrackImageUrl } from "@/constants/images";
import { defaultStyles } from "@/constants/styles";
import { colors, fontSizes } from "@/constants/tokens";
import { usePlayerBackground } from "@/hooks/use-player-background";
import { wp } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import FastImage from "react-native-fast-image";
import { ScreenWrapper } from "../screen-wrapper";
import { PlayerControls } from "./player-controls";
import { PlayerProgressBar } from "./player-progress-bar";

type PlayerModalProps = {
  track?: Track;
};

export const PlayerModal = forwardRef<BottomSheet, PlayerModalProps>(
  ({ track }, ref) => {
    const imageColors = usePlayerBackground(
      track?.image ?? unknownTrackImageUrl
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        enablePanDownToClose={true}
        snapPoints={["100%"]}
        handleComponent={() => null}
      >
        <StatusBar style="light" />
        <LinearGradient
          colors={
            imageColors
              ? [imageColors.average, imageColors.darkMuted]
              : [colors.background, colors.background]
          }
          style={{ flex: 1 }}
        >
          <BottomSheetScrollView style={styles.scrollContainer}>
            <ScreenWrapper
              style={[
                { backgroundColor: "transparent" },
                defaultStyles.paddingHorizontal,
              ]}
            >
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity activeOpacity={0.7}>
                  <Ionicons
                    name="chevron-down"
                    size={24}
                    color={colors.text.primary}
                  />
                </TouchableOpacity>
                <View style={styles.headerTextContainer}>
                  <Text style={styles.headerTitle}>Now Playing</Text>
                  <Text style={styles.headerSubtitle}>From Playlist</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7}>
                  <Ionicons
                    name="ellipsis-vertical"
                    size={24}
                    color={colors.text.primary}
                  />
                </TouchableOpacity>
              </View>

              {/* Image */}

              <View style={styles.artworkContainer}>
                <FastImage
                  source={{ uri: track?.image ?? unknownTrackImageUrl }}
                  style={styles.artwork}
                />
              </View>

              {/* Track Info */}
              <View style={styles.infoContainer}>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoTitle}>{track?.title}</Text>
                  <Text style={styles.infoSubtitle}>{track?.artist}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7}>
                  <Ionicons
                    name="heart-outline"
                    size={26}
                    color={colors.text.primary}
                  />
                </TouchableOpacity>
              </View>
              <PlayerProgressBar />
              <PlayerControls />
            </ScreenWrapper>
          </BottomSheetScrollView>
        </LinearGradient>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTextContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    color: colors.text.primary,
    fontSize: fontSizes.sm,
    textTransform: "uppercase",
  },
  headerSubtitle: {
    color: colors.text.primary,
    fontSize: fontSizes.md,
  },
  artworkContainer: {
    width: "100%",
    aspectRatio: 1,
    marginTop: wp(10),
    borderRadius: wp(2),
    elevation: 8,
  },
  artwork: {
    width: "100%",
    height: "100%",
    borderRadius: wp(2),
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: wp(10),
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    color: colors.text.primary,
    fontSize: fontSizes.lg,
    fontWeight: "600",
  },
  infoSubtitle: {
    color: colors.text.secondary,
    fontSize: fontSizes.sm,
  },
});

PlayerModal.displayName = "PlayerModal";
