import { useQuery } from "@tanstack/react-query";

import request from "@/lib/request";
import { SearchPlaylistResponse } from "@/types/search";

const getSearchPlaylists = async (
  query: string,
  { page, limit }: { page: number; limit: number }
) => {
  const response = await request<SearchPlaylistResponse>({
    url: "/search/playlists",
    params: {
      query,
      page,
      limit,
    },
  });

  return response.data;
};

export const useGetSearchPlaylists = (
  searchQuery: string,
  { enabled, page, limit }: { enabled: boolean; page: number; limit: number }
) => {
  const query = useQuery({
    queryKey: ["search", "playlists", { searchQuery }],
    queryFn: () => getSearchPlaylists(searchQuery, { page, limit }),
    enabled: !!searchQuery && enabled,
  });

  return query;
};
