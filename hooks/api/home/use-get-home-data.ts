import request from "@/lib/request";
import { HomeResponse } from "@/types/home";
import { useQuery } from "@tanstack/react-query";

const getHomeData = async () => {
  const response = await request<HomeResponse>({
    url: "/home",
  });

  return response.data;
};

export const useGetHomeData = () => {
  const query = useQuery({
    queryKey: ["home"],
    queryFn: getHomeData,
  });

  return query;
};
