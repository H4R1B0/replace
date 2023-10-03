import { api, Header } from "./index";

export const logout = () => {
  return api.delete(`/user`, {}, Header());
};

export const signout = () => {
  return api.delete(`/user/me`, {}, Header());
};
