import Image from "next/image";
import { digitsEnToFa } from "@persian-tools/persian-tools";

import ReserveButton from "./ReserveButton";
import { getLocationName } from "@/utils/cities";
import {
  formatDate,
  formatPrice,
  getTourDays,
  getVehicleName,
} from "@/utils/formater";
import styles from "./TourDetail.module.css";

const perks = [
  { label: "تورلیدر از مبدا", icon: "/images/user-tick.svg" },
  { label: "برنامه سفر", icon: "/images/map.svg" },
  { label: "تضمین کیفیت", icon: "/images/medal-star.svg" },
];

function TourDetail({ tour }) {
  const {
    id,
    title,
    image,
    price,
    startDate,
    endDate,
    origin,
    fleetVehicle,
    capacity,
    insurance,
  } = tour;

  const nights = getTourDays(startDate, endDate);
  const days = nights + 1;

  const info = [
    {
      label: "مبدا",
      value: getLocationName(origin),
      icon: "/images/routing-2.svg",
      desktopOnly: true,
    },
    {
      label: "تاریخ رفت",
      value: formatDate(startDate),
      icon: "/images/calendar (3).svg",
      desktopOnly: true,
    },
    {
      label: "تاریخ برگشت",
      value: formatDate(endDate),
      icon: "/images/calendar-2.svg",
      desktopOnly: true,
    },
    {
      label: "حمل و نقل",
      value: getVehicleName(fleetVehicle),
      icon: "/images/bus.svg",
    },
    {
      label: "ظرفیت",
      value: `حداکثر ${digitsEnToFa(String(capacity))} نفر`,
      icon: "/images/profile-2user.svg",
    },
    {
      label: "بیمه",
      value: insurance ? "بیمه ۵۰ هزار دیناری" : "ندارد",
      icon: "/images/security.svg",
    },
  ];

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
                <p>{item.value}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default TourDetail;
