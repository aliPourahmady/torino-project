import api from "@/lib/api";

const getBasket = async () => {
  const { data } = await api.get("/basket");
  return data;
};
const putTourInBasket = async (tourId) => {
  const { data } = await api.put(`/basket/${tourId}`);
  return data;
};

export { getBasket, putTourInBasket };
