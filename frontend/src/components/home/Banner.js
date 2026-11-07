"use client";
import DateField from "@/ui/DateField";
import LocationField from "@/ui/LocationField";
import { getCities } from "@/utils/cities";
import { toApiDate } from "@/utils/formater";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import styles from "./Banner.module.css";

const cities = getCities();

function Banner() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [range, setRange] = useState(null);

  const [start, end] = [range?.from, range?.to].sort(
    (a, b) => new Date(a) - new Date(b),
  );

  const params = new URLSearchParams();
  if (origin) params.set("originId", origin.id);
  if (destination) params.set("destinationId", destination.id);
  if (start) params.set("startDate", toApiDate(start));
  if (end) params.set("endDate", toApiDate(end));

  const query = params.toString();
  const href = query ? `/?${query}` : "/";

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
        <DateField onChange={setRange} />
        <Link
          href={href}
          scroll={false}
          prefetch={false}
          className={styles.submit}
        >
          جستجو
        </Link>
      </div>
    </div>
  );
}

export default Banner;
