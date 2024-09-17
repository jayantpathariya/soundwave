export type Filter = {
  id: string;
  title: string;
  value: string;
};

export const filters: Filter[] = [
  {
    id: "1",
    title: "All",
    value: "all",
  },
  {
    id: "2",
    title: "Songs",
    value: "songs",
  },
  {
    id: "3",
    title: "Albums",
    value: "albums",
  },
  {
    id: "4",
    title: "Artists",
    value: "artists",
  },
  {
    id: "5",
    title: "Playlists",
    value: "playlists",
  },
];

export default filters;
