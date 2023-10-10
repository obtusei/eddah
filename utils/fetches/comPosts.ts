import { TOKEN_KEY } from "./../constant";
import * as SecureStore from "expo-secure-store";
import useSWR from "swr";
import fetcher from "../fetcher";
import { SITE_URL } from "../constant";
import axios from "axios";

const useComPosts = (following: boolean = false) => {
  const { data, isLoading, error, mutate } = useSWR(
    SITE_URL + `/post${following ? `/following` : ``}`,
    fetcher
  );

  async function createCommunityPost({
    id,
    image,
    content,
  }: {
    id: string;
    image: any;
    content: string;
  }) {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("content", content);
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const res = await axios.postForm(`${SITE_URL}/com/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token != null && token}`,
        },
      });
      const data = await res.data;
      mutate();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return {
    commPosts: data,
    isLoading: isLoading,
    error: error,
    mutate: mutate,
    createCommunityPost,
  };
};

export default useComPosts;
