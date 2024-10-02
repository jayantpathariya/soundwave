import { usePlayerStore } from "@/store/player-store";
import TrackPlayer, { Event, State } from "react-native-track-player";

const setCurrentTrack = usePlayerStore.getState().setCurrentTrack;
const setPosition = usePlayerStore.getState().setPosition;
const setRepeatMode = usePlayerStore.getState().setRepeatMode;
const setQueue = usePlayerStore.getState().setQueue;

export const PlaybackServices = async () => {
  TrackPlayer.addEventListener(
    Event.PlaybackProgressUpdated,
    async ({ position, track }) => {
      const currentTrack = await TrackPlayer.getTrack(track);
      const repeatMode = await TrackPlayer.getRepeatMode();
      if (!currentTrack) return;
      setCurrentTrack(currentTrack);
      setPosition(position);
      setRepeatMode(repeatMode);
    }
  );

  TrackPlayer.addEventListener(Event.PlaybackState, async (event) => {
    if (event.state === State.Ready) {
      const queue = await TrackPlayer.getQueue();
      setQueue(queue);
    }
  });
};
