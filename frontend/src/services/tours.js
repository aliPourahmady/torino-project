import api from "@/lib/api";

const getTours = async () => {
  const { data } = await api.get("proxy/tour");
  return data;
};
const getTour = async (id) => {
  const { data } = await api.get(`proxy/tour/${id}`);
  return data;
};

export { getTours, getTour };
