"use client";

import { useUserTours } from "@/hooks/useProfile";
import styles from "./MyToursPage.module.css";
import MyToursCard from "./MyToursCard";

function MyToursPage() {
  const { data, isPending, isError, refetch, isFetching } = useUserTours();
  const tours = Array.isArray(data) ? data : (data?.tours ?? []);

  return (
    <section className={styles.wrapper} aria-busy={isPending}>
      {isPending && (
        <div className={styles.list} aria-label="در حال بارگذاری">
          {[0, 1].map((i) => (
            <div key={i} className={styles.skeleton} />
          ))}
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
