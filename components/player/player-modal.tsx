import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { forwardRef, useCallback, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { artists } from "@/assets/data/aritst";
import { Track } from "@/assets/data/tracks";
import { unknownTrackImageUrl } from "@/constants/images";
import { defaultStyles } from "@/constants/styles";
import { colors, fontSizes } from "@/constants/tokens";
import { usePlayerBackground } from "@/hooks/use-player-background";
import { wp } from "@/lib/utils";
import FastImage from "react-native-fast-image";
import { ScreenWrapper } from "../screen-wrapper";
import { PlayerActionsButtons } from "./player-action-buttons";
import { PlayerArtist } from "./player-artist";
import { PlayerControls } from "./player-controls";
import { PlayerHeader } from "./player-header";
import { PlayerLyrics } from "./player-lyrics";
import { PlayerProgressBar } from "./player-progress-bar";
import { PlayerQueue } from "./player-queue";

type PlayerModalProps = {
  track?: Track;
};

const artist = artists[0];

export const PlayerModal = forwardRef<BottomSheet, PlayerModalProps>(
  ({ track }, ref) => {
    const queueSheetRef = useRef<BottomSheet>(null);

    const imageColors = usePlayerBackground(
      track?.image ?? unknownTrackImageUrl
    );

    const handleOpenPlayerQueue = useCallback(() => {
      queueSheetRef.current?.snapToIndex(0);
    }, []);

    return (
      <>
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
                  { backgroundColor: "transparent", paddingBottom: wp(4) },
                  defaultStyles.paddingHorizontal,
                ]}
              >
                {/* Header */}
                <PlayerHeader />

                {/* Artwork */}
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
                <PlayerActionsButtons
                  onOpenPlayerQueue={handleOpenPlayerQueue}
                />
                <PlayerLyrics gradientColors={imageColors} />
                <PlayerArtist artist={artist} />
              </ScreenWrapper>
            </BottomSheetScrollView>
          </LinearGradient>
        </BottomSheet>
        <PlayerQueue ref={queueSheetRef} />
      </>
    );
  }
);

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
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
