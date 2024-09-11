import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { forwardRef, memo, MutableRefObject, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TrackPlayer, {
  Track,
  useActiveTrack,
  usePlayWhenReady,
} from "react-native-track-player";

import { defaultStyles } from "@/constants/styles";
import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";
import { ScreenWrapper } from "../screen-wrapper";
import { PlayerQueueHeader } from "./player-queue-header";
import { PlayerQueueItem } from "./player-queue-item";

export const PlayerQueue = memo(
  forwardRef<BottomSheet>((props, ref) => {
    const [queue, setQueue] = useState<Track[]>([]);
    const isPlayerReady = usePlayWhenReady();
    const activeTrack = useActiveTrack();

    useEffect(() => {
      if (!isPlayerReady || !activeTrack) return;
      const getQueue = async () => {
        const queue = await TrackPlayer.getQueue();
        setQueue(queue);
      };

      getQueue();
    }, [isPlayerReady, activeTrack]);

    const handleClose = () => {
      if ((ref as MutableRefObject<BottomSheet | null>).current) {
        (ref as MutableRefObject<BottomSheet | null>).current?.close();
      }
    };

    const handleTrackSelect = async (selectedTrack: Track) => {
      const trackIndex = queue.findIndex(
        (track) => track.id === selectedTrack.id
      );

      await TrackPlayer.skip(trackIndex);
      handleClose();
    };

    if (!activeTrack) return null;

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
              <PlayerQueueItem track={activeTrack!} nowPlaying />
              <Text style={[styles.queueTitle, { marginTop: wp(3) }]}>
                Queue
              </Text>
            </View>
          </View>
          <BottomSheetFlatList
            data={queue}
            renderItem={({ item, index }) => (
              <PlayerQueueItem
                track={item}
                OnTrackSelect={handleTrackSelect}
                index={index + 1}
                isActiveTrack={activeTrack?.id === item.id}
              />
            )}
            contentContainerStyle={[
              defaultStyles.paddingHorizontal,
              defaultStyles.paddingBottom,
              {
                gap: wp(3),
              },
            ]}
          />
        </ScreenWrapper>
      </BottomSheet>
    );
  })
);

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
