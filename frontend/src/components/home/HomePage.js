import { Suspense } from "react";
import Banner from "./Banner";
import ToursSkeleton from "./ToursSkeleton";
import Phone from "./Phone";
import Why from "./Why";
import Options from "./Options";
import ToureSection from "./ToureSection";

function HomePage() {
  return (
    <>
      <Banner />
      <main>
        <Suspense fallback={<ToursSkeleton />}>
          <ToureSection />
        </Suspense>
        <Phone />
        <Why />
        <Options />
      </main>
    </>
  );
}

export default HomePage;
