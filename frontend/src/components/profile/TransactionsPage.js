"use client";

import { digitsEnToFa } from "@persian-tools/persian-tools";
import { useUserTransactions } from "@/hooks/useProfile";
import {
  formatDateTime,
  formatPrice,
  getTransactionTypeName,
} from "@/utils/formater";
import styles from "./TransactionsPage.module.css";

function TransactionsPage() {
  const {
    data: transactions,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useUserTransactions();

  if (isPending) {
    return (
      <div
        className={styles.skeleton}
        aria-busy="true"
        aria-label="در حال بارگذاری"
      />
    );
  }

  if (isError) {
    return (
      <div className={styles.state} role="alert">
        <p>دریافت تراکنش‌ها با مشکل مواجه شد.</p>
        <button
          className={styles.button}
          onClick={() => refetch()}
          disabled={isFetching}
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className={styles.state}>
        <p>هنوز تراکنشی ثبت نشده است.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>تاریخ و ساعت</th>
            <th>مبلغ (تومان)</th>
            <th className={styles.type}>نوع تراکنش</th>
            <th>شماره سفارش</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={`${transaction.id}-${index}`}>
              <td>{formatDateTime(transaction.createdAt)}</td>
              <td>{formatPrice(transaction.amount)}</td>
              <td className={styles.type}>
                {getTransactionTypeName(transaction.type)}
              </td>
              <td>
                <span className={styles.prefix}>سفارش </span>
                {digitsEnToFa(transaction.id)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsPage;
