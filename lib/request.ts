import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface RequestOptions extends AxiosRequestConfig {
  url: string;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export default async function request<T>(options: RequestOptions): Promise<T> {
  const { url, method = "GET", data, params, ...rest } = options;

  try {
    const response: AxiosResponse<T> = await axiosInstance({
      url,
      method,
      data,
      params,
      ...rest,
    });
    return response.data;
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
}
