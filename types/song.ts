import { Artist } from "./artist";
import { DownloadLink } from "./common";

export type Song = {
  id: string;
  title: string;
  type: string;
  year: string;
  releaseDate?: string | null;
  duration?: string | null;
  label?: string | null;
  explicitContent: boolean;
  playCount?: number | null;
  language: string;
  hasLyrics: boolean;
  lyricsId?: string | null;
  lyrics?: string;
  url: string;
  copyright?: string | null;
  album: {
    id: string;
    title: string;
    url: string;
  };
  artists: {
    primary: Artist[];
    featured: Artist[];
    all: Artist[];
  };
  image: DownloadLink[];
  downloadUrl: DownloadLink[];
};

export type SongLyrics = {
  lyrics: string;
  lyrics_copyright: string;
  snippet: string;
};

export type SongResponse = {
  data: Song[];
};

export type SongLyricsResponse = {
  data: SongLyrics;
};
