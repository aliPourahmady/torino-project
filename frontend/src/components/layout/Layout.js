import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SendOtpModal from "@/auth/SendOtpModal";
import CheckOtpModal from "@/auth/CheckOtpModal";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <SendOtpModal />
      <CheckOtpModal />
    </>
  );
}

export default Layout;
