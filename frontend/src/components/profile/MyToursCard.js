import { digitsEnToFa } from "@persian-tools/persian-tools";
import Image from "next/image";
import { getLocationName } from "@/utils/cities";
import {
  formatDateWithWeekday,
  formatPrice,
  getVehicleIcon,
  getVehicleName,
  isTourFinished,
} from "@/utils/formater";
import styles from "./MyToursCard.module.css";
import Badge from "@/ui/Badge";

function MyToursCard({ tour }) {
  const finished = isTourFinished(tour.endDate);

  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <div className={styles.row}>
          <h3 className={`${styles.col} ${styles.withIcon}`}>
            <Image src="/images/sun-fog.svg" alt="" width={20} height={20} />
            {tour.title}
          </h3>

          <p className={`${styles.col} ${styles.withIcon} ${styles.vehicle}`}>
            <Image
              src={getVehicleIcon(tour.fleetVehicle)}
              alt=""
              width={24}
              height={24}
            />
            سفر با {getVehicleName(tour.fleetVehicle)}
          </p>

          <div className={styles.badge}>
            <Badge variant={finished ? "success" : "warning"}>
              {finished ? "به اتمام رسیده" : "در حال برگزاری"}
            </Badge>
          </div>
        </div>

        <div className={`${styles.row} ${styles.dates}`}>
          <div className={`${styles.col} ${styles.line}`}>
            <p>
              {getLocationName(tour.origin)} به{" "}
              {getLocationName(tour.destination)}
            </p>
            <span className={styles.dot} aria-hidden="true" />
            <p className={styles.muted}>
              {formatDateWithWeekday(tour.startDate)}
            </p>
          </div>

          <div className={`${styles.col} ${styles.line}`}>
            <p>تاریخ برگشت</p>
            <span className={styles.dot} aria-hidden="true" />
            <p className={styles.muted}>
              {formatDateWithWeekday(tour.endDate)}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerItem}>
          <p className={styles.muted}>شماره تور</p>
          <p>{digitsEnToFa(tour.id)}</p>
        </div>
        <div className={styles.footerItem}>
          <p className={styles.muted}>مبلغ پرداخت شده</p>
          <p className={styles.price}>
            {formatPrice(tour.price)}{" "}
            <span className={styles.currency}>تومان</span>
          </p>
        </div>
      </div>
    </article>
  );
}

export default MyToursCard;
