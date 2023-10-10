import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { SITE_URL, TOKEN_KEY, USER_TYPE_KEY } from "../constant";
import AuthProps, { USER_TYPE } from "../../libs/AuthProps";

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    type: USER_TYPE;
    token: string | null;
    authenticated: boolean | null;
  }>({
    type: null,
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const type = (await SecureStore.getItemAsync(USER_TYPE_KEY)) as USER_TYPE;
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({
          type: type,
          token: token,
          authenticated: true,
        });
      }
    };
    loadToken();
  }, []);

  const register = async (
    type: "user" | "org",
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await axios.post(`${SITE_URL}/auth/register?type=${type}`, {
        name,
        email,
        password,
      });
      const data = await res.data;
      console.log(data);
      return res;
    } catch (error) {
      return {
        error: true,
        message: (error as any).response.data.message,
      };
    }
  };
  const login = async (
    type: "user" | "org",
    email: string,
    password: string
  ) => {
    try {
      const res = await axios.post(`${SITE_URL}/auth/login?type=${type}`, {
        email,
        password,
      });
      setAuthState({
        type: res.data.data.type,
        token: res.data.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.data.token}`;
      alert("Logged in successfully");
      await SecureStore.setItemAsync(TOKEN_KEY, String(res.data.data.token));
      await SecureStore.setItemAsync(USER_TYPE_KEY, String(res.data.data.type));
      return res;
    } catch (e) {
      return {
        error: true,
        msg: e.response.data.message,
      };
    }
  };
  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_TYPE_KEY);
    axios.defaults.headers.common["Authorization"] = "";
    console.log("#DELETED TOKEN");
    setAuthState({
      type: null,
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
