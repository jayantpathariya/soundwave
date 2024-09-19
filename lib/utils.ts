import { ArtistMap } from "@/types/artist";
import { Song } from "@/types/song";
import { Dimensions } from "react-native";
import { Track } from "react-native-track-player";

const USER_QUALITY = "320kbps";

const { width, height } = Dimensions.get("window");

export const hp = (percentage: number) => {
  return (percentage * height) / 100;
};

export const wp = (percentage: number) => {
  return (percentage * width) / 100;
};

export const createArtistString = (artists: ArtistMap[]) => {
  return artists.map((artist) => artist.name).join(", ");
};

export const createTrack = (song: Song): Track => {
  const track = {
    id: song.id,
    url:
      song.downloadUrl.find((link) => link.quality === USER_QUALITY)?.url ??
      song.downloadUrl[song.downloadUrl.length - 1].url,
    duration: parseInt(song.duration ?? "0"),
    title: song.title,
    artist: createArtistString(song.artists.primary),
    album: song.album.title,
    date: new Date(song.releaseDate ?? "1970-01-01").toISOString(),
    artwork: song.image.find((link) => link.quality === "500x500")?.url,
    artistArtwork: song.artists.primary[0].image.find(
      (link) => link.quality === "500x500"
    )?.url,
    hasLyrics: song.hasLyrics,
  };

  return track;
};

export const formatSecondsToMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  return `${minutes}:${formattedSeconds}`;
};

export const formatNumber = (number: number | null) => {
  return number
    ? Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        notation: "compact",
      }).format(number)
    : "0";
};
