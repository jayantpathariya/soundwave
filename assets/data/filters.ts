export type Filter = {
  id: string;
  title: string;
};

export const filters: Filter[] = [
  {
    id: "1",
    title: "All",
  },
  {
    id: "2",
    title: "Songs",
  },
  {
    id: "3",
    title: "Albums",
  },
  {
    id: "4",
    title: "Artists",
  },
  {
    id: "5",
    title: "Playlists",
  },
];

export default filters;
