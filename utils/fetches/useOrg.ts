import useSWR from "swr";
import { SITE_URL } from "../constant";
import fetcher from "../fetcher";

const useOrg = () => {
  const { data, isLoading, error, mutate } = useSWR(
    SITE_URL + `/org/me`,
    fetcher
  );
  return {
    sessionUser: data,
    isLoading: isLoading,
    error: error,
    mutate: mutate,
  };
};

export default useOrg;
