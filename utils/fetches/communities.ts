import { TOKEN_KEY } from "./../constant";
import * as SecureStore from "expo-secure-store";
import useSWR from "swr";
import fetcher from "../fetcher";
import { SITE_URL } from "../constant";
import axios from "axios";

const useCommunities = (id?: string) => {
  const { data, isLoading, error, mutate } = useSWR(
    SITE_URL + `/com${id ? `/${id}` : ``}`,
    fetcher
  );

  async function createCommunity(formData: FormData) {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    try {
      const res = await axios.postForm(SITE_URL + `/com`, formData, {
        headers: {
          Authorization: `Bearer ${token != null && token}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  return {
    communities: data,
    isLoading: isLoading,
    error: error,
    mutate: mutate,
    createCommunity,
  };
};

export default useCommunities;
