import { getTourServer } from "@/services/toursSSR";
import TourDetail from "@/tours/TourDetail";
import { notFound } from "next/navigation";
import React from "react";
export async function generateMetadata({ params }) {
  const { tourId } = await params;
  const tour = await getTourServer(tourId);
  return { title: tour ? `${tour.title}` : "تور یافت نشد" };
}

async function TourPage({ params }) {
  const { tourId } = await params;
  const tour = await getTourServer(tourId);
  if (!tour) notFound();
  return <TourDetail tour={tour} />;
}

export default TourPage;
