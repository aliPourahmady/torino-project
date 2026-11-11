import Image from "next/image";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import ReserveButton from "./ReserveButton";
import { formatPrice, getTourDays } from "@/utils/formater";
import { perks, info } from "src/const/tourDetailData";

import styles from "./TourDetail.module.css";

function TourDetail({ tour }) {
  const { id, title, image, price, startDate, endDate } = tour;

  const nights = getTourDays(startDate, endDate);
  const days = nights + 1;

  return (
    <div className={styles.page}>
      <section className={styles.container}>
        <div className={styles.card}>
          <div className={styles.top}>
            <div className={styles.imageBox}>
              <Image
                src={image}
                alt={title}
                fill
                sizes="(min-width: 768px) 355px, 100vw"
                priority
              />
            </div>

            <div className={styles.details}>
              <div className={styles.head}>
                <h1>{title}</h1>
                <p>
                  {digitsEnToFa(String(days))} روز و{" "}
                  {digitsEnToFa(String(nights))} شب
                </p>
              </div>

              <ul className={styles.perks}>
                {perks.map((perk) => (
                  <li key={perk.label}>
                    <Image src={perk.icon} width={24} height={24} alt="" />
                    {perk.label}
                  </li>
                ))}
              </ul>

              <div className={styles.buy}>
                <p className={styles.price}>
                  <span>{formatPrice(price)}</span>
                  تومان
                </p>
                <ReserveButton tourId={id} className={styles.reserve} />
              </div>
            </div>
          </div>

          <ul className={styles.info}>
            {info.map((item) => (
              <li
                key={item.label}
                className={item.desktopOnly ? styles.desktopOnly : undefined}
              >
                <span className={styles.label}>
                  <Image src={item.icon} width={20} height={20} alt="" />
                  {item.label}
                </span>
                <p>{item.getValue(tour)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default TourDetail;
