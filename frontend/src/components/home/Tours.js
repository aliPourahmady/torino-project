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
  const hasMore = tours ? visibleCount < tours.length : false;

  return (
    <section className={styles.container}>
      <h1>همه تور ها</h1>
      <div className={styles.tours}>
        <ul>
          {isLoading &&
            Array.from({ length: TOUR_COUNT }).map((_, i) => (
              <li key={i}>
                <Skeleton height={300} borderRadius={16} />
              </li>
            ))}
          {tours?.map((tour, i) => (
            <li
              key={tour.id}
              className={i >= visibleCount ? styles.hiddenOnMobile : undefined}
            >
              <TourCard tour={tour} />
            </li>
          ))}
        </ul>
        {hasMore && (
          <button
            className={styles.more}
            onClick={() => setVisibleCount((count) => count + TOUR_COUNT)}
          >
            نمایش بیشتر
            <Image
              src="/images/arrow-down1.svg"
              width={20}
              height={20}
              alt=""
            />
          </button>
        )}
      </div>
    </section>
  );
}

export default Tours;
