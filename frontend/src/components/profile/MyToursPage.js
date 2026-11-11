"use client";

import { useUserTours } from "@/hooks/useProfile";
import MyToursCard from "./MyToursCard";
import Skeleton from "react-loading-skeleton";

import styles from "./MyToursPage.module.css";

function MyToursPage() {
  const {
    data: tours = [],
    isPending,
    isError,
    refetch,
    isFetching,
  } = useUserTours();

  return (
    <section className={styles.wrapper} aria-busy={isPending}>
      {isPending && (
        <div className={styles.list}>
          <Skeleton height={168} borderRadius={10} />
          <Skeleton height={168} borderRadius={10} />
        </div>
      )}

      {isError && (
        <div className={styles.state} role="alert">
          <p>دریافت تورها با مشکل مواجه شد.</p>
          <button
            className={styles.button}
            onClick={() => refetch()}
            disabled={isFetching}
          >
            تلاش مجدد
          </button>
        </div>
      )}

      {!isPending && !isError && tours.length === 0 && (
        <div className={styles.state}>
          <p>هنوز توری رزرو نکرده‌اید.</p>
        </div>
      )}

      {tours.length > 0 && (
        <div className={styles.list}>
          {tours.map((tour, index) => (
            <MyToursCard key={`${tour.id}-${index}`} tour={tour} />
          ))}
        </div>
      )}
    </section>
  );
}

export default MyToursPage;
