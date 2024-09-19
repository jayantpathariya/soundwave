import { ArtistMap } from "./artist";
import { DownloadLink } from "./common";
import { Song } from "./song";

export type MiniPlaylist = {
  id: string;
  title: string;
  type: string;
  image: DownloadLink[];
  url: string;
  year: number | null;
  playCount: number | null;
  language: string | null;
  explicitContent: boolean;
};

export type Playlist = {
  id: string;
  title: string;
  description: string | null;
  year: number | null;
  type: string;
  playCount: number | null;
  language: string;
  explicitContent: boolean;
  songCount: number | null;
  url: string;
  image: DownloadLink[];
  songs: Song[];
  artists: ArtistMap[];
};

export type PlaylistResponse = {
  data: Playlist;
};
