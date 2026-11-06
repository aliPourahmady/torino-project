"use client";
import Skeleton from "react-loading-skeleton";

import styles from "./Tours.module.css";

function ToursSkeleton() {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>همه تور ها</h1>
      <div className={styles.tours}>
        <ul>
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i}>
              <Skeleton height={300} borderRadius={16} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ToursSkeleton;
