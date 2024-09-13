import { useQuery } from "@tanstack/react-query";

import request from "@/lib/request";
import { SongLyricsResponse } from "@/types/song";

const getSongLyrics = async (id: string) => {
  const response = await request<SongLyricsResponse>({
    url: `/songs/${id}/lyrics`,
  });

  return response.data;
};

export const useGetSongLyrics = (
  id: string,
  {
    enabled,
  }: {
    enabled?: boolean;
  }
) => {
  const query = useQuery({
    queryKey: ["song", { id }],
    queryFn: () => getSongLyrics(id),
    enabled: enabled,
  });

  return query;
};
