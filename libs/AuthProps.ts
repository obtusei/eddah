export type USER_TYPE = "user" | "org";

export default interface AuthProps {
  authState?: {
    type: USER_TYPE;
    token: string | null;
    authenticated: boolean | null;
  };
  onRegister?: (
    type: "user" | "org",
    name: string,
    email: string,
    password: string
  ) => Promise<any>;
  onLogin?: (
    type: "user" | "org",
    email: string,
    password: string
  ) => Promise<any>;
  onLogout?: () => Promise<any>;
}
