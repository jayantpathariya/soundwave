import { useQuery } from "@tanstack/react-query";

import request from "@/lib/request";
import { SearchPlaylistResponse } from "@/types/search";

const getSearchPlaylists = async (query: string) => {
  const response = await request<SearchPlaylistResponse>({
    url: "/search/playlists",
    params: {
      query,
      page: 1,
      limit: 50,
    },
  });

  return response.data;
};

export const useGetSearchPlaylists = (
  searchQuery: string,
  { enabled }: { enabled: boolean }
) => {
  const query = useQuery({
    queryKey: ["search", "playlists", { searchQuery }],
    queryFn: () => getSearchPlaylists(searchQuery),
    enabled: !!searchQuery && enabled,
  });

  return query;
};
