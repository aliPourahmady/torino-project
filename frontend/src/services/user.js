import api from "@/lib/api";

const getProfile = async () => {
  const { data } = await api.get("/user/profile");
  return data;
};

const putProfile = async (user) => {
  const { data } = await api.put("/user/profile", user);
  return data;
};

const getUserTours = async () => {
  const { data } = await api.get("/user/tours");
  return data;
};

const getUserTransactions = async () => {
  const { data } = await api.get("/user/transactions");
  return data;
};

export { getProfile, putProfile, getUserTours, getUserTransactions };
