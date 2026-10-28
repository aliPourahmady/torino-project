import api from "@/lib/api";

export const getProfile = async () => {
  const { data } = await api.get("proxy/user/profile");
  return data;
};

export const logout = () => api.post("auth/logout");
