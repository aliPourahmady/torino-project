"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

import styles from "./SuccessPage.module.css";

function SuccessPage() {
  const queryClient = useQueryClient();

  // the order is done, so the basket is stale now
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["basket"] });
  }, [queryClient]);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <svg
          className={styles.icon}
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M7.5 12.5l3 3 6-6.5" />
        </svg>

        <h1 className={styles.title}>تور شما با موفقیت خریداری شد</h1>

        <Link href="/" className={styles.link}>
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}

export default SuccessPage;
