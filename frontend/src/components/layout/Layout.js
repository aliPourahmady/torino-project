import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SendOtpModal from "@/auth/SendOtpModal";
import CheckOtpModal from "@/auth/CheckOtpModal";
import SkeletonThems from "@/ui/SkeletonThems";
import { Toaster } from "sonner";

function Layout({ children }) {
  return (
    <>
      <SkeletonThems>
        <Header />
        <main>{children}</main>
        <Footer />
        <SendOtpModal />
        <CheckOtpModal />
        <Toaster richColors position="top-right" />
      </SkeletonThems>
    </>
  );
}

export default Layout;
