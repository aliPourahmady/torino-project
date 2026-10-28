import { configureStore } from "@reduxjs/toolkit";
import authModalReducer from "./features/auth/authSlice";

const store = configureStore({
  reducer: {
    authModal: authModalReducer,
  },
});

export default store;
