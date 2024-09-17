import { useQuery } from "@tanstack/react-query";

import request from "@/lib/request";
import { SearchSongResponse } from "@/types/search";

const getSearchSongs = async (
  query: string,
  { page, limit }: { page: number; limit: number }
) => {
  const response = await request<SearchSongResponse>({
    url: "/search/songs",
    params: {
      query,
      page,
      limit,
    },
  });

  return response.data;
};

export const useGetSearchSongs = (
  searchQuery: string,
  { enabled, page, limit }: { enabled: boolean; page: number; limit: number }
) => {
  const query = useQuery({
    queryKey: ["search", "songs", { searchQuery }],
    queryFn: () => getSearchSongs(searchQuery, { page, limit }),
    enabled: !!searchQuery && enabled,
  });

  return query;
};
