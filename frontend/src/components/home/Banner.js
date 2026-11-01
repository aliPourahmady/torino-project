"use client";
import DateField from "@/ui/DateField";
import LocationField from "@/ui/LocationField";
import SkeletonThems from "@/ui/SkeletonThems";
import { getCities } from "@/utils/cities";
import Image from "next/image";
import React, { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Calendar, CalendarProvider } from "zaman";

const cities = getCities();

function Banner() {
  const [date, setDate] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  return (
    <div>
      <Image
        src="/images/Untitled_design__1_.svg"
        alt="banner"
        width={390}
        height={119}
      />
      <h1>
        <span>تورینو</span>
        برگزار کننده بهترین تور های داخلی و خارجی
      </h1>
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
      <DateField onChange={setDate} />
      <button>جستجو</button>
    </div>
  );
}

export default Banner;
