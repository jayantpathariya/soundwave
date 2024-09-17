import { useQuery } from "@tanstack/react-query";

import request from "@/lib/request";
import { SearchResponse } from "@/types/search";

const getSearchAll = async (query: string) => {
  const response = await request<SearchResponse>({
    url: "/search",
    params: {
      query,
    },
  });

  return response.data;
};

export const useGetSearchAll = (searchQuery: string) => {
  const query = useQuery({
    queryKey: ["search", { searchQuery }],
    queryFn: () => getSearchAll(searchQuery),
    enabled: !!searchQuery,
  });

  return query;
};
