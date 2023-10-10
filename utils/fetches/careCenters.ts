import * as SecureStore from "expo-secure-store";
import useSWR from "swr";
import fetcher from "../fetcher";
import { SITE_URL } from "../constant";

const useCareCenters = (id?: string) => {
  const { data, isLoading, error, mutate } = useSWR(
    SITE_URL + `/care-center${id ? `/${id}` : ``}`,
    fetcher
  );
  return {
    careCenter: data,
    isLoading: isLoading,
    error: error,
    mutate: mutate,
  };
};

export default useCareCenters;
