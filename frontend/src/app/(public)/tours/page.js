import ToureSection from "@/home/ToureSection";
import ToursSkeleton from "@/home/ToursSkeleton";
import { Suspense } from "react";

export default async function ToursPage({ searchParams }) {
  const filters = await searchParams;

  return (
    <Suspense key={JSON.stringify(filters)} fallback={<ToursSkeleton />}>
      <ToureSection filters={filters} title="نتایج جستجو" />
    </Suspense>
  );
}
