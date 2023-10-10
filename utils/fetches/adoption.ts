import axios from "axios";
import getToken from "../getToken";
import { SITE_URL } from "../constant";
import fetcher from "../fetcher";
import useSWR from "swr";

const useAdoption = () => {
  const { data, isLoading, error, mutate } = useSWR(
    `${SITE_URL}/adopt`,
    fetcher
  );

  const acceptAdoption = async (adoptId: string) => {
    try {
      const token = await getToken();
      const res = await axios.put(
        `${SITE_URL}/adopt`,
        { adoptId: adoptId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const r = await res.data;
      mutate(`${SITE_URL}/user/me`);
      alert(`Adoption acceptedj`);
      console.log(r);
    } catch (err) {
      alert("Adoption failed to be accepted");
      console.log(err);
    }
  };
  const removeAdoption = async () => {
    // try {
    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_API_URL}/api/adopt?id=${id}`,
    //     {
    //       method: "DELETE",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${authState.token}`,
    //       },
    //     }
    //   );
    //   const r = await res.json();
    //   if (!res.ok) {
    //     throw new Error(r.message);
    //   }
    //   mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/adopt/${id}`);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return {
    data: data,
    isLoading: isLoading,
    error: error,
    mutate: mutate,
    acceptAdoption: acceptAdoption,
    removeAdoption: removeAdoption,
  };
};

export default useAdoption;
