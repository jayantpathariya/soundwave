import unknownArtist from "@/assets/images/unknown-artist.jpg";
import unknownTrack from "@/assets/images/unknown-track.jpg";

import { Image } from "react-native";

export const unknownTrackImageUrl = Image.resolveAssetSource(unknownTrack).uri;
export const unknownArtistImageUrl =
  Image.resolveAssetSource(unknownArtist).uri;
