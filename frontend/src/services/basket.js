import api from "@/lib/api";

const getBasket = async () => {
  const { data } = await api.get("proxy/basket");
  return data;
};
const putTourInBasket = async (tourId) => {
  const { data } = await api.put(`proxy/basket/${tourId}`);
  return data;
};

export { getBasket, putTourInBasket };
