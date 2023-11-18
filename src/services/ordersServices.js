import { api } from "boot/axios";

export const getOrders = async () => {
  var resp = await api.get(`orders.json`);
  return resp.data;
};

export const addOrder = async (order) => {
  var resp = await api.post(`orders.json`, order);
  return resp.data;
};
