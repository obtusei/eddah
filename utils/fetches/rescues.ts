import * as SecureStore from "expo-secure-store";
import useSWR from "swr";
import fetcher from "../fetcher";
import { SITE_URL } from "../constant";
import axios from "axios";
import getToken from "../getToken";
import { Alert } from "react-native";

const useRescues = (id?: string) => {
  const { data, isLoading, error, mutate } = useSWR(
    SITE_URL + `/rescues`,
    fetcher
  );

  const handleRescue = async ({
    image,
    lat,
    lon,
    description,
    callback,
  }: {
    image: any;
    lat: number;
    lon: number;
    description: string;
    callback: () => void;
  }) => {
    try {
      const token = await getToken();
      if (image == null) throw new Error("no image");
      const data = new FormData();
      data.append("file", image);
      data.append("locationName", "HEHE");
      data.append("locationLat", String(lat));
      data.append("locationLon", String(lon));
      data.append("description", description);
      let res = await fetch(`${SITE_URL}/user/rescue`, {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let result = await res.json();
      if (!res.ok) throw new Error(`${res.status} ERROR`);
      console.log(result);
      callback();
    } catch (e) {
      alert(JSON.stringify(e));
    }
  };

  return {
    rescues: data,
    isLoading: isLoading,
    error: error,
    rescueADog: handleRescue,
  };
};

export default useRescues;
