import { useQuery } from "@tanstack/react-query";

import request from "@/lib/request";
import { SearchSongResponse } from "@/types/search";

const getSearchSongs = async (query: string) => {
  const response = await request<SearchSongResponse>({
    url: "/search/songs",
    params: {
      query,
      page: 1,
      limit: 50,
    },
  });

  return response.data;
};

export const useGetSearchSongs = (
  searchQuery: string,
  { enabled }: { enabled: boolean }
) => {
  const query = useQuery({
    queryKey: ["search", "songs", { searchQuery }],
    queryFn: () => getSearchSongs(searchQuery),
    enabled: !!searchQuery && enabled,
  });

  return query;
};
