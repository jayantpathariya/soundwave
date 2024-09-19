import request from "@/lib/request";
import { ArtistResponse } from "@/types/artist";
import { useQuery } from "@tanstack/react-query";

const getArtist = async (id: string) => {
  const response = await request<ArtistResponse>({
    url: `/artists/${id}`,
  });

  return response.data;
};

export const useGetArtist = (id: string) => {
  const query = useQuery({
    queryKey: ["artists", { id }],
    queryFn: () => getArtist(id),
  });

  return query;
};
