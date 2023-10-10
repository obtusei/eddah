import * as SecureStore from "expo-secure-store";
import axios, { AxiosRequestConfig } from "axios";
import { TOKEN_KEY } from "../utils/constant";

const fetcher = async (url: string, config?: AxiosRequestConfig) => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const response = await axios(url, {
      ...config,
      headers: {
        Authorization: `Bearer ${token != null && token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export default fetcher;
