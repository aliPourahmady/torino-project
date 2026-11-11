import api from "@/lib/api";
import { deleteCookie, setCookie } from "@/utils/cookie";

async function sendOtp(mobile) {
  const { data } = await api.post("/auth/send-otp", { mobile });
  return data;
}

async function checkOtp(mobile, code) {
  const { data } = await api.post("/auth/check-otp", { mobile, code });
  setCookie("accessToken", data.accessToken, 1 / 24);
  setCookie("refreshToken", data.refreshToken, 7);
  return data;
}

function logout() {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
}
export { sendOtp, checkOtp, logout };
