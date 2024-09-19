import { useQuery } from "@tanstack/react-query";

import request from "@/lib/request";
import { SearchAlbumResponse } from "@/types/search";

const getSearchAlbums = async (query: string) => {
  const response = await request<SearchAlbumResponse>({
    url: "/search/albums",
    params: {
      query,
      page: 1,
      limit: 50,
    },
  });

  return response.data;
};

export const useGetSearchAlbums = (
  searchQuery: string,
  { enabled }: { enabled: boolean }
) => {
  const query = useQuery({
    queryKey: ["search", "albums", { searchQuery }],
    queryFn: () => getSearchAlbums(searchQuery),
    enabled: !!searchQuery && enabled,
  });

  return query;
};
