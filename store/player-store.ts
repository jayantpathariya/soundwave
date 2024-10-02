import AsyncStorage from "@react-native-async-storage/async-storage";
import TrackPlayer, { RepeatMode, Track } from "react-native-track-player";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PlayerState {
  currentTrack: Track | null;
  queue: Track[];
  repeatMode: RepeatMode;
  volume: number;
  position: number;

  // Actions
  setCurrentTrack: (track: Track | null) => void;
  setQueue: (tracks: Track[]) => void;
  setRepeatMode: (mode: RepeatMode) => void;
  setVolume: (volume: number) => void;
  setPosition: (position: number) => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      currentTrack: null,
      queue: [],
      repeatMode: RepeatMode.Off,
      volume: 1,
      position: 0,
      duration: 0,
      downloadedTracks: {},

      setCurrentTrack: (track) => set({ currentTrack: track }),
      setQueue: (tracks) => set({ queue: tracks }),
      setRepeatMode: async (mode) => {
        await TrackPlayer.setRepeatMode(mode);
        set({ repeatMode: mode });
      },
      setVolume: async (volume) => {
        await TrackPlayer.setVolume(volume);
        set({ volume });
      },
      setPosition: (position) => set({ position }),
    }),
    {
      name: "player-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        currentTrack: state.currentTrack,
        queue: state.queue,
        volume: state.volume,
        repeatMode: state.repeatMode,
        position: state.position,
      }),
    }
  )
);
