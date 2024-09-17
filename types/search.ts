import { DownloadLink } from "@/types/common";

type SearchAlbum = {
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

type SearchSong = {
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

type SearchArtist = {
  id: string;
  title: string;
  image: DownloadLink[];
  type: string;
  description: string;
  position: number;
};

type SearchPlaylist = {
  id: string;
  title: string;
  image: DownloadLink[];
  url: string;
  language: string;
  type: string;
  description: string;
};

type SearchTopQuery = {
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
  | SearchAlbum
  | SearchSong
  | SearchArtist
  | SearchPlaylist
  | SearchTopQuery;

export type SearchResponse = {
  data: SearchAll[];
};
