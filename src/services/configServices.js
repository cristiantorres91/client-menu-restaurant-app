import { api } from "boot/axios";

export const getConfig = async () => {
  var resp = await api.get(`config.json`);
  return resp.data;
};
