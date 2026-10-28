import api from "@/lib/api";

const sendOtp = async (mobile) => api.post("auth/send-otp", { mobile });

const checkOtp = async (mobile, code) =>
  api.post("auth/check-otp", { mobile, code });

export { sendOtp, checkOtp };
