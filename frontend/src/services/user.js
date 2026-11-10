import api from "@/lib/api";

export const getProfile = async () => {
  const { data } = await api.get("proxy/user/profile");
  return data;
};

export const putProfile = async (user) => {
  const { data } = await api.put("proxy/user/profile", user);
  return data;
};

export const getUserTours = async () => {
  const { data } = await api.get("proxy/user/tours");
  return data;
};

export const getUserTransactions = async () => {
  const { data } = await api.get("proxy/user/transactions");
  return data;
};
export const logout = () => api.post("auth/logout");
