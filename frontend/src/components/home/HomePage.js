import React from "react";
import Banner from "./Banner";
import TourCard from "@/tours/TourCard";
import Tours from "./Tours";

function HomePage() {
  return (
    <>
      <Banner />
      <main>
        <Tours />
      </main>
    </>
  );
}

export default HomePage;
