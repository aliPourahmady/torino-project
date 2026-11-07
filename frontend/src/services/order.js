import api from "@/lib/api";

export const createOrder = (data) =>
  api.post("/proxy/order", data).then((res) => res.data);
