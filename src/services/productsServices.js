import { api } from "boot/axios";

export const getProducts = async () => {
  var resp = await api.get(`menu.json`);
  return resp.data;
};
