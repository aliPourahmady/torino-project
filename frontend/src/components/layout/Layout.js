import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SendOtpModal from "@/auth/SendOtpModal";
import CheckOtpModal from "@/auth/CheckOtpModal";
import SkeletonThems from "@/ui/SkeletonThems";

function Layout({ children }) {
  return (
    <>
      <SkeletonThems>
        <Header />
        <main>{children}</main>
        <Footer />
        <SendOtpModal />
        <CheckOtpModal />
      </SkeletonThems>
    </>
  );
}

export default Layout;
