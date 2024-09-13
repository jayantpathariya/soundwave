import { useQuery } from "@tanstack/react-query";

import request from "@/lib/request";
import { AlbumResponse } from "@/types/album";

const getAlbum = async (id: string) => {
  const response = await request<AlbumResponse>({
    url: `/albums/${id}`,
  });

  return response.data;
};

export const useGetAlbum = (id: string) => {
  const query = useQuery({
    queryKey: ["album", { id }],
    queryFn: () => getAlbum(id),
  });

  return query;
};
