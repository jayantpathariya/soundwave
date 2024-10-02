import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { decode } from "html-entities";
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BackHandler, StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { useActiveTrack } from "react-native-track-player";

import { MovingText } from "@/components/moving-text";
import { PlayerActionsButtons } from "@/components/player/player-action-buttons";
import { PlayerArtist } from "@/components/player/player-artist";
import { PlayerControls } from "@/components/player/player-controls";
import { PlayerHeader } from "@/components/player/player-header";
import { PlayerProgressBar } from "@/components/player/player-progress-bar";
import { PlayerQueue } from "@/components/player/player-queue";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { unknownTrackImageUrl } from "@/constants/images";
import { defaultStyles } from "@/constants/styles";
import { colors, fontSizes } from "@/constants/tokens";
import { useLastActiveTrack } from "@/hooks/use-last-active-track";
import { usePlayerBackground } from "@/hooks/use-player-background";
import { wp } from "@/lib/utils";

export const PlayerModal = memo(
  forwardRef<BottomSheet>((props, ref) => {
    const queueSheetRef = useRef<BottomSheet>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const activeTrack = useActiveTrack();
    const lastActiveTrack = useLastActiveTrack();

    const displayedTrack = activeTrack ?? lastActiveTrack;

    const imageColors = usePlayerBackground(
      displayedTrack?.artwork ?? unknownTrackImageUrl
    );

    const handleOpenPlayerQueue = useCallback(() => {
      queueSheetRef.current?.snapToIndex(0);
      setIsSheetOpen(true);
    }, []);

    const handleBackPress = useCallback(() => {
      if (isSheetOpen) {
        queueSheetRef.current?.close();
        setIsSheetOpen(false);
        return true;
      }
      return false;
    }, [queueSheetRef, isSheetOpen]);

    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      };
    }, [handleBackPress]);

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
                <PlayerHeader playingFrom={activeTrack?.playlistTitle ?? ""} />

                {/* Artwork */}
                <View style={styles.artworkContainer}>
                  <FastImage
                    source={{
                      uri: displayedTrack?.artwork ?? unknownTrackImageUrl,
                    }}
                    style={styles.artwork}
                  />
                </View>

                {/* Track Info */}
                <View style={styles.infoContainer}>
                  <View style={styles.infoTextContainer}>
                    <MovingText
                      text={decode(displayedTrack?.title)}
                      style={styles.infoTitle}
                      animationThreshold={20}
                    />
                    <MovingText
                      text={displayedTrack?.artist ?? "Unknown Artist"}
                      style={styles.infoSubtitle}
                      animationThreshold={20}
                    />
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ marginLeft: wp(3) }}
                  >
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
                {/* {activeTrack?.hasLyrics && (
                  <PlayerLyrics
                    gradientColors={imageColors}
                    songId={activeTrack?.id}
                    duration={activeTrack?.duration}
                  />
                )} */}
                <PlayerArtist
                  artistArtwork={activeTrack?.artistArtwork}
                  artistNames={activeTrack?.artist}
                />
              </ScreenWrapper>
            </BottomSheetScrollView>
          </LinearGradient>
        </BottomSheet>
        <PlayerQueue ref={queueSheetRef} />
      </>
    );
  })
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
    overflow: "hidden",
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
