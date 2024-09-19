import { ArtistMap } from "@/types/artist";
import { DownloadLink } from "@/types/common";
import { Song } from "@/types/song";

export type Album = {
  id: string;
  title: string;
  description: string;
  year: number | null;
  type: string;
  playCount: number | null;
  language: string;
  explicitContent: boolean;
  artists: {
    primary: ArtistMap[];
    featured: ArtistMap[];
    all: ArtistMap[];
  };
  songCount: number | null;
  url: string;
  image: DownloadLink[];
  songs: Song[];
};

export type AlbumResponse = {
  data: Album;
};
