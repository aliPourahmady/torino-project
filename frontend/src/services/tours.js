import api from "@/lib/api";

const getTours = async (filters) => {
  const { data } = await api.get("/tour", { params: filters });
  return data;
};
const getTour = async (id) => {
  const { data } = await api.get(`tour/${id}`);
  return data;
};

export { getTours, getTour };
