import React from "react";
import Banner from "./Banner";
import TourCard from "@/tours/TourCard";
import Tours from "./Tours";
import Phone from "./Phone";
import Why from "./Why";

function HomePage() {
  return (
    <>
      <Banner />
      <main>
        <Tours />
        <Phone />
        <Why />
      </main>
    </>
  );
}

export default HomePage;
