import { useSegments } from "expo-router";

export const generatePath = (segments: ReturnType<typeof useSegments>) => {
  return segments.join("/");
};
