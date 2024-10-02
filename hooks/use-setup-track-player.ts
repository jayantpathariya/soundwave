import { useCallback, useEffect, useRef } from "react";
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from "react-native-track-player";

import { PlaybackServices } from "@/lib/playback-services";
import { usePlayerStore } from "@/store/player-store";

const setupPlayer = async () => {
  TrackPlayer.registerPlaybackService(() => PlaybackServices);

  await TrackPlayer.setupPlayer({
    maxCacheSize: 1024 * 100,
  });
  await TrackPlayer.updateOptions({
    compactCapabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.Stop,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.JumpBackward,
      Capability.JumpForward,
      Capability.SeekTo,
    ],
    android: {
      appKilledPlaybackBehavior:
        AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
    },
    progressUpdateEventInterval: 5,
  });
};

export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
  const { currentTrack, repeatMode, position, queue } = usePlayerStore();
  const isInitialized = useRef(false);

  const initializePlayer = useCallback(async () => {
    if (!currentTrack) return;
    const currentTrackIndex = queue.findIndex(
      (track) => track.id === currentTrack.id
    );

    const beforeTracks = queue.slice(0, currentTrackIndex);
    const afterTracks = queue.slice(currentTrackIndex + 1);
    await TrackPlayer.add(currentTrack);
    await TrackPlayer.add(afterTracks);
    await TrackPlayer.add(beforeTracks);
    await TrackPlayer.seekTo(position);
    await TrackPlayer.setRepeatMode(repeatMode);
  }, [currentTrack, position, repeatMode, queue]);

  useEffect(() => {
    if (!isInitialized.current) {
      setupPlayer()
        .then(async () => {
          isInitialized.current = true;
          await initializePlayer();
          onLoad?.();
        })
        .catch((error) => {
          isInitialized.current = false;
          console.error(error);
        });
    }
  }, [onLoad, initializePlayer]);
};
