import { useQuery } from "@tanstack/react-query";

import request from "@/lib/request";
import { SongResponse } from "@/types/song";

export const getSong = async (id: string) => {
  const response = await request<SongResponse>({
    url: `/songs/${id}`,
  });

  return response.data;
};

export const useGetSong = (
  id: string,
  {
    enabled,
  }: {
    enabled?: boolean;
  }
) => {
  const query = useQuery({
    queryKey: ["song", { id }],
    queryFn: () => getSong(id),
    enabled: enabled,
  });

  return query;
};
