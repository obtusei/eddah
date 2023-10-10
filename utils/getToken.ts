import * as SecureStore from "expo-secure-store";
import { TOKEN_KEY } from "./constant";

export default async function getToken() {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  return token;
}
