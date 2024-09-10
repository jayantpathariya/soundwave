import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler } from "react-native";

import { tracks } from "@/assets/data/tracks";
import { FloatingPlayer } from "./floating-player";
import { PlayerModal } from "./player-modal";

const track = tracks[2];

export function Player() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleOpenPlayer = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
    setIsSheetOpen(true);
  }, []);

  const handleBackPress = useCallback(() => {
    if (isSheetOpen) {
      bottomSheetRef.current?.close();
      setIsSheetOpen(false);
      return true;
    }
    return false;
  }, [isSheetOpen]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [handleBackPress]);

  return (
    <>
      <FloatingPlayer onPress={handleOpenPlayer} />
      <PlayerModal ref={bottomSheetRef} />
    </>
  );
}
