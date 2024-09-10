import { DownloadLink } from "./common";

export type Artist = {
  id: string;
  name: string;
  role: string;
  image: DownloadLink[];
  type: string;
  url: string;
};
