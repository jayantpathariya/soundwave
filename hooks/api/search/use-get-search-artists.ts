import { useQuery } from "@tanstack/react-query";

import request from "@/lib/request";
import { SearchArtistResponse } from "@/types/search";

const getSearchArtists = async (query: string) => {
  const response = await request<SearchArtistResponse>({
    url: "/search/artists",
    params: {
      query,
      page: 1,
      limit: 50,
    },
  });

  return response.data;
};

export const useGetSearchArtists = (
  searchQuery: string,
  { enabled }: { enabled: boolean }
) => {
  const query = useQuery({
    queryKey: ["search", "artists", { searchQuery }],
    queryFn: () => getSearchArtists(searchQuery),
    enabled: !!searchQuery && enabled,
  });

  return query;
};
