import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import { getTourDays } from "@/utils/formater";

import styles from "./OrderSummary.module.css";

function OrderSummary({ basket, isPending }) {
  const { title, price, startDate, endDate } = basket;

  return (
    <aside className={styles.card}>
      <div className={styles.top}>
        <h3 className={styles.name}>{title}</h3>
        <span className={styles.duration}>
          {getTourDays(startDate, endDate)}
        </span>
      </div>

      <div className={styles.price}>
        <span className={styles.label}>قیمت نهایی</span>
        <span className={styles.value}>
          <strong className={styles.amount}>
            {digitsEnToFa(addCommas(price))}
          </strong>
          <span className={styles.unit}>تومان</span>
        </span>
      </div>

      <button
        type="submit"
        form="passenger-form"
        className={styles.submit}
        disabled={isPending}
      >
        {isPending ? "در حال ثبت..." : "ثبت و خرید نهایی"}
      </button>
    </aside>
  );
}

export default OrderSummary;
