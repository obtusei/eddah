import * as SecureStore from "expo-secure-store";
import useSWR from "swr";
import fetcher from "../fetcher";
import { SITE_URL } from "../constant";
import axios from "axios";
import { TOKEN_KEY } from "../context/AuthContext";

const useVets = (id?: string) => {
  const { data, isLoading, error, mutate } = useSWR(
    SITE_URL + `/veterinarians${id ? `?id=${id}` : ``}`,
    fetcher
  );
  return {
    vets: data,
    isLoading: isLoading,
    error: error,
    mutate: mutate,
  };
};

export default useVets;
