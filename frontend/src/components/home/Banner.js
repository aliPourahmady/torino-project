"use client";
import DateField from "@/ui/DateField";
import LocationField from "@/ui/LocationField";
import SkeletonThems from "@/ui/SkeletonThems";
import { getCities } from "@/utils/cities";
import Image from "next/image";
import React, { useState } from "react";

import styles from "./Banner.module.css";

const cities = getCities();

function Banner() {
  const [date, setDate] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  return (
    <div className={styles.container}>
      <Image
        src="/images/Untitled_design__1_.svg"
        alt="banner"
        width={390}
        height={119}
        className={styles.banner}
      />
      <h2 className={styles.title}>
        <span>تورینو</span>
        برگزار کننده بهترین تور های داخلی و خارجی
      </h2>
      <div className={styles.search}>
        <div className={styles.fileds}>
          <LocationField
            placeholder="مبدا"
            options={cities}
            value={origin}
            onChange={setOrigin}
          />
          <LocationField
            placeholder="مقصد"
            options={cities}
            value={destination}
            onChange={setDestination}
          />
        </div>
        <DateField onChange={setDate} />
        <button>جستجو</button>
      </div>
    </div>
  );
}

export default Banner;
