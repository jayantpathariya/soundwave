import { Album } from "@/types/album";
import { DownloadLink } from "@/types/common";
import { Song } from "@/types/song";

export type ArtistMap = {
  id: string;
  name: string;
  role: string;
  image: DownloadLink[];
  type: string;
  url: string;
};

export type Artist = {
  id: string;
  name: string;
  url: string;
  type: string;
  image: DownloadLink[];
  followerCount: number | null;
  fanCount: string | null;
  isVerified: boolean | null;
  dominantLanguage: string | null;
  dominantType: string | null;
  bio:
    | {
        text: string | null;
        title: string | null;
        sequence: string | null;
      }[]
    | null;
  dob: string | null;
  fb: string | null;
  twitter: string | null;
  wiki: string | null;
  availableLanguages: string[];
  isRadioPresent: boolean | null;
  topSongs: Song[] | null;
  topAlbums: Album[] | null;
  singles: Song[] | null;
  similarArtist:
    | {
        id: string;
        name: string;
        url: string;
        image: DownloadLink[];
        languages: Record<string, string> | null;
        wiki: string;
        dob: string;
        fb: string;
        twitter: string;
        isRadioPresent: boolean;
        type: string;
        dominantType: string;
        aka: string;
        bio: string | null;
        similarArtist:
          | {
              id: string;
              name: string;
            }[]
          | null;
      }[]
    | null;
};

export type ArtistResponse = {
  data: Artist;
};

export type ArtistSongs = {
  title: string;
  image: DownloadLink[];
  type: string;
  total: number;
  songs: Song[];
  songCount: number;
};

export type ArtistSongsResponse = {
  data: ArtistSongs;
};

export type ArtistAlbums = {
  title: string;
  image: DownloadLink[];
  type: string;
  total: number;
  albums: Album[];
};

export type ArtistAlbumsResponse = {
  data: ArtistAlbums;
};
