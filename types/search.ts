import { DownloadLink } from "@/types/common";
import { Song } from "@/types/song";

type SearchAllAlbum = {
  id: string;
  title: string;
  image: DownloadLink[];
  artist: string;
  url: string;
  type: string;
  description: string;
  year: string;
  language: string;
  songIds: string;
};

type SearchAllSong = {
  id: string;
  title: string;
  image: DownloadLink[];
  album: string;
  url: string;
  type: string;
  description: string;
  primaryArtists: string;
  singers: string;
  language: string;
};

type SearchAllArtist = {
  id: string;
  title: string;
  image: DownloadLink[];
  type: string;
  description: string;
  position: number;
};

type SearchAllPlaylist = {
  id: string;
  title: string;
  image: DownloadLink[];
  url: string;
  language: string;
  type: string;
  description: string;
};

type SearchAllTopQuery = {
  id: string;
  title: string;
  image: DownloadLink[];
  album: string;
  url: string;
  type: string;
  description: string;
  primaryArtists: string;
  singers: string;
  language: string;
};

export type SearchAll =
  | SearchAllAlbum
  | SearchAllSong
  | SearchAllArtist
  | SearchAllPlaylist
  | SearchAllTopQuery;

export type SearchResponse = {
  data: SearchAll[];
};

export type SearchSongResponse = {
  data: {
    total: number;
    start: number;
    result: Song[];
  };
};
