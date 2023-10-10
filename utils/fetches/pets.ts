import * as SecureStore from "expo-secure-store";
import useSWR from "swr";
import fetcher from "../fetcher";
import { SITE_URL } from "../constant";
import axios from "axios";
import getToken from "../getToken";

const useDogs = (id?: string) => {
  const { data, isLoading, error, mutate } = useSWR(
    SITE_URL + `/dogs${id ? `?id=${id}` : ``}`,
    fetcher
  );

  async function likeADog(dogId: string) {
    try {
      const token = await getToken();
      const result = await axios.post(
        SITE_URL + "/user/save",
        { dogId: dogId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      mutate();
      const data = result.data;
      console.log("SUCCESSFULLY LIKED A DOG:", data);
    } catch (err) {
      console.log("ERROR LIKING A DOG:", err);
    }
  }

  async function postForAdoption(formData: FormData) {
    try {
      const token = await getToken();

      const result = await axios.postForm(SITE_URL + "/dogs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Successfully added for adoption!");
      const data = result.data;
      console.log("SUCCESSFULLY ADOPTED A DOG:", data);
    } catch (err) {}
  }

  async function adoptADog(dogId: string) {
    try {
      const token = await getToken();
      const result = await axios.post(
        SITE_URL + "/adopt",
        { dogId: dogId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      mutate(`${SITE_URL}/dogs/${id}`);
      mutate(`${SITE_URL}/adopt/${id}`);
      mutate(`${SITE_URL}/user/me`);
      alert("THANK YOU FOR ADOPTING A DOG!");
      const data = result.data;
      console.log("SUCCESSFULLY ADOPTED A DOG:", data);
    } catch (err) {
      console.log("ERROR ADOPTING A DOG:", err);
    }
  }

  return {
    dogs: data,
    isLoading: isLoading,
    error: error,
    likeADog: likeADog,
    adoptADog: adoptADog,
    postForAdoption: postForAdoption,
  };
};

export default useDogs;
