import request from "@/lib/request";
import { PlaylistResponse } from "@/types/playlist";
import { useQuery } from "@tanstack/react-query";

const getPlaylist = async (id: string) => {
  const response = await request<PlaylistResponse>({
    url: `/playlists/${id}`,
  });

  return response.data;
};

export const useGetPlaylist = (id: string) => {
  const query = useQuery({
    queryKey: ["playlist", { id }],
    queryFn: () => getPlaylist(id),
  });

  return query;
};
