"use client";
import { useTours } from "@/hooks/useTours";
import TourCard from "@/tours/TourCard";
import Image from "next/image";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";

import styles from "./Tours.module.css";

const TOUR_COUNT = 4;
function Tours() {
  const { data: tours, isLoading } = useTours();
  const [visibleCount, setVisibleCount] = useState(TOUR_COUNT);
  const visibleTours = tours?.slice(0, visibleCount) ?? [];
  const hasMore = tours ? visibleCount < 8 : false;
  return (
    <section>
      <h1>همه تور ها</h1>
      <div>
        <ul>
          {isLoading &&
            Array.from({ length: TOUR_COUNT }).map((_, i) => (
              <li key={i}>
                <Skeleton height={300} borderRadius={16} />
              </li>
            ))}
          {visibleTours &&
            visibleTours.map((tour) => (
              <li key={tour.id}>
                <TourCard tour={tour} />
              </li>
            ))}
        </ul>
        {hasMore && (
          <button
            type="button"
            className={styles.more}
            onClick={() => setVisibleCount((count) => count + TOUR_COUNT)}
          >
            نمایش بیشتر
            <Image src="/images/arrow-down.svg" width={20} height={20} alt="" />
          </button>
        )}
      </div>
    </section>
  );
}

export default Tours;
