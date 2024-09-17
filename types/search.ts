import { DownloadLink } from "@/types/common";
import { Song } from "@/types/song";
import { Artist } from "./artist";

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

export type SearchAlbumsResultItem = {
  id: string;
  title: string;
  description: string;
  year: number | null;
  type: string;
  playCount: number | null;
  language: string;
  explicitContent: boolean;
  artists: {
    primary: Artist[];
    featured: Artist[];
    all: Artist[];
  };
  url: string;
  image: DownloadLink[];
};

export type SearchAlbumResponse = {
  data: {
    total: number;
    start: number;
    results: SearchAlbumsResultItem[];
  };
};

export type SearchArtistResponse = {
  data: { total: number; start: number; results: Artist[] };
};

export type SearchPlaylistResultItem = {
  id: string;
  title: string;
  type: string;
  image: DownloadLink[];
  url: string;
  songCount: number | null;
  language: string;
  explicitContent: boolean;
};

export type SearchPlaylistResponse = {
  data: {
    total: number;
    start: number;
    results: SearchPlaylistResultItem[];
  };
};
