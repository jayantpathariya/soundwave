import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef } from "react";
import { BackHandler } from "react-native";

import { tracks } from "@/assets/data/tracks";
import { FloatingPlayer } from "./floating-player";
import { PlayerModal } from "./player-modal";

const track = tracks[2];

export function Player() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpenPlayer = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const handleBackPress = useCallback(() => {
    if (bottomSheetRef?.current) {
      bottomSheetRef.current.close();
      return true;
    }
    return false;
  }, [bottomSheetRef]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [handleBackPress]);

  return (
    <>
      <FloatingPlayer track={track} onPress={handleOpenPlayer} />
      <PlayerModal ref={bottomSheetRef} track={track} />
    </>
  );
}
