import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";

import { tracks } from "@/assets/data/tracks";
import { FloatingPlayer } from "./floating-player";
import { PlayerModal } from "./player-modal";

const track = tracks[2];

export function Player() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpenPlayer = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  return (
    <>
      <FloatingPlayer track={track} onPress={handleOpenPlayer} />
      <PlayerModal ref={bottomSheetRef} track={track} />
    </>
  );
}
