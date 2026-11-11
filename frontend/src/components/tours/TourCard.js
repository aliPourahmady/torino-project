"use client";
import Image from "next/image";

import stylse from "./TourCard.module.css";
import {
  formatPrice,
  getTourDays,
  getTourMonth,
  getVehicleName,
  truncate,
} from "@/utils/formater";
import Link from "next/link";

function TourCard({ tour }) {
  const {
    id,
    image,
    title,
    price,
    startDate,
    endDate,
    fleetVehicle,
    options = [],
  } = tour;

  const days = getTourDays(startDate, endDate).toLocaleString("fa-IR");

  const description = [
    `${getTourMonth(startDate)} ماه . ${days} روزه`,
    getVehicleName(fleetVehicle),
    ...options,
  ].join(" – ");

  return (
    <div className={stylse.container}>
      <div className={stylse.title}>
        <Image src={image} alt={title} width={327} height={159} />
        <h3>{title}</h3>
        <p>{truncate(description, 40)}</p>
      </div>
      <hr className={stylse.line} />
      <div className={stylse.price}>
        <Link href={`/tours/${id}`} className={stylse.reserve}>
          رزرو
        </Link>
        <p>
          <span>{formatPrice(price)}</span>
          تومان
        </p>
      </div>
    </div>
  );
}

export default TourCard;
