import { useQuery } from "@tanstack/react-query";

import request from "@/lib/request";
import { SearchArtistResponse } from "@/types/search";

const getSearchArtists = async (
  query: string,
  { page, limit }: { page: number; limit: number }
) => {
  const response = await request<SearchArtistResponse>({
    url: "/search/artists",
    params: {
      query,
      page,
      limit,
    },
  });

  return response.data;
};

export const useGetSearchArtists = (
  searchQuery: string,
  { enabled, page, limit }: { enabled: boolean; page: number; limit: number }
) => {
  const query = useQuery({
    queryKey: ["search", "artists", { searchQuery }],
    queryFn: () => getSearchArtists(searchQuery, { page, limit }),
    enabled: !!searchQuery && enabled,
  });

  return query;
};
