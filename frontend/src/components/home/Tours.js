"use client";
import TourCard from "@/tours/TourCard";
import Image from "next/image";
import React, { useState } from "react";

import styles from "./Tours.module.css";

const TOUR_COUNT = 4;
function Tours({ tours, title = "همه تور ها" }) {
  const [visibleCount, setVisibleCount] = useState(TOUR_COUNT);
  const hasMore = visibleCount < tours.length;

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{title}</h1>

      {tours.length === 0 && <p>توری با این مشخصات یافت نشد</p>}

      <div className={styles.tours}>
        <ul>
          {tours.map((tour, i) => (
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
