import request from "@/lib/request";
import { ArtistSongs, ArtistSongsResponse } from "@/types/artist";
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";

const getArtistSongs = async (id: string, page: number) => {
  const response = await request<ArtistSongsResponse>({
    url: `/artists/${id}/songs`,
    params: { page, limit: 20 },
  });
  return response.data;
};

export const useGetArtistSongs = (id: string) => {
  return useInfiniteQuery<
    ArtistSongs,
    Error,
    InfiniteData<ArtistSongs>,
    QueryKey,
    number
  >({
    queryKey: ["artists", "songs", { id }],
    queryFn: ({ pageParam }) => getArtistSongs(id, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.songs.length ? nextPage : undefined;
    },
  });
};
