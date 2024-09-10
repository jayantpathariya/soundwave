import { DownloadLink } from "./common";

export type Playlist = {
  id: string;
  title: string;
  description: string;
  type: string;
  image: DownloadLink[];
  url: string;
  year: number | null;
  playCount: number | null;
  language: string | null;
  explicitContent: boolean;
};
