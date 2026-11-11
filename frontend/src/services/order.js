import api from "@/lib/api";

const createOrder = (data) => api.post("/order", data).then((res) => res.data);

export { createOrder };
