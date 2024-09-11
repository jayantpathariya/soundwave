import { useEffect, useState } from "react";
import { Track, useActiveTrack } from "react-native-track-player";

export const useLastActiveTrack = () => {
  const [lastActiveTrack, setLastActiveTrack] = useState<Track>();

  const activeTrack = useActiveTrack();

  useEffect(() => {
    if (!activeTrack) return;

    setLastActiveTrack(activeTrack);
  }, [activeTrack]);

  return lastActiveTrack;
};
