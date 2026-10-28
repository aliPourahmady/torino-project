// store/authModalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authModalSlice = createSlice({
  name: "authModal",
  initialState: {
    isOpen: false,
    step: "mobile", // "mobile" | "otp"
    mobile: "",
    redirectAfterLogin: null,
  },
  reducers: {
    openModal(state, action) {
      state.isOpen = true;
      state.step = "mobile";
      state.redirectAfterLogin = action.payload?.redirectTo ?? null;
    },
    closeModal(state) {
      state.isOpen = false;
      state.mobile = "";
    },
    setStep(state, action) {
      state.step = action.payload;
    },
    setMobile(state, action) {
      state.mobile = action.payload;
    },
  },
});

export default authModalSlice.reducer;
export const { openModal, closeModal, setStep, setMobile } =
  authModalSlice.actions;
