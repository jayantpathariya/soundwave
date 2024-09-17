import { useQuery } from "@tanstack/react-query";

import request from "@/lib/request";
import { SearchAlbumResponse } from "@/types/search";

const getSearchAlbums = async (
  query: string,
  { page, limit }: { page: number; limit: number }
) => {
  const response = await request<SearchAlbumResponse>({
    url: "/search/albums",
    params: {
      query,
      page,
      limit,
    },
  });

  return response.data;
};

export const useGetSearchAlbums = (
  searchQuery: string,
  { enabled, page, limit }: { enabled: boolean; page: number; limit: number }
) => {
  const query = useQuery({
    queryKey: ["search", "albums", { searchQuery }],
    queryFn: () => getSearchAlbums(searchQuery, { page, limit }),
    enabled: !!searchQuery && enabled,
  });

  return query;
};
