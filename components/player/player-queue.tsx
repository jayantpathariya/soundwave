import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { forwardRef, MutableRefObject } from "react";
import { StyleSheet, Text, View } from "react-native";

import { tracks } from "@/assets/data/tracks";
import { defaultStyles } from "@/constants/styles";
import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";
import { ScreenWrapper } from "../screen-wrapper";
import { PlayerQueueHeader } from "./player-queue-header";
import { PlayerQueueItem } from "./player-queue-item";

export const PlayerQueue = forwardRef<BottomSheet>((props, ref) => {
  const handleClose = () => {
    if ((ref as MutableRefObject<BottomSheet | null>).current) {
      (ref as MutableRefObject<BottomSheet | null>).current?.close();
    }
  };

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      enablePanDownToClose={true}
      snapPoints={["100%"]}
      handleComponent={() => null}
    >
      <ScreenWrapper>
        <View style={defaultStyles.paddingHorizontal}>
          <PlayerQueueHeader onClose={handleClose} />

          <View style={styles.nowPlayingItem}>
            <Text style={styles.queueTitle}>Now Playing</Text>
            <PlayerQueueItem track={tracks[0]} nowPlaying />
            <Text style={[styles.queueTitle, { marginTop: wp(3) }]}>Queue</Text>
          </View>
        </View>
        <BottomSheetFlatList
          data={tracks.slice(1)}
          renderItem={({ item, index }) => (
            <PlayerQueueItem track={item} index={index + 1} />
          )}
          contentContainerStyle={defaultStyles.paddingHorizontal}
        />
      </ScreenWrapper>
    </BottomSheet>
  );
});

PlayerQueue.displayName = "PlayerQueue";

const styles = StyleSheet.create({
  nowPlayingItem: {
    marginTop: wp(5),
  },
  queueTitle: {
    fontSize: fontSizes.lg,
    color: colors.text.primary,
    fontWeight: "500",
    marginBottom: wp(3),
  },
});
