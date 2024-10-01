import request from "@/lib/request";
import { ArtistAlbums, ArtistAlbumsResponse } from "@/types/artist";
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";

const getArtistAlbums = async (id: string, page: number) => {
  const response = await request<ArtistAlbumsResponse>({
    url: `/artists/${id}/albums`,
    params: { page, limit: 20 },
  });
  return response.data;
};

export const useGetArtistAlbums = (id: string) => {
  return useInfiniteQuery<
    ArtistAlbums,
    Error,
    InfiniteData<ArtistAlbums>,
    QueryKey,
    number
  >({
    queryKey: ["artists", "albums", { id }],
    queryFn: ({ pageParam }) => getArtistAlbums(id, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.albums.length ? nextPage : undefined;
    },
  });
};
