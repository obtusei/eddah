import useSWR from "swr";
import { SITE_URL } from "../constant";
import fetcher from "../fetcher";

const useUser = () => {
  const { data, isLoading, error, mutate } = useSWR(
    SITE_URL + `/user/me`,
    fetcher
  );
  return {
    sessionUser: data,
    isLoading: isLoading,
    error: error,
    mutate: mutate,
  };
};

export default useUser;
