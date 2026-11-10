"use client";
import CardSlider from "@/ui/CardSlider";

import Image from "next/image";
import React from "react";
import { slides } from "src/const/slides";

import styles from "./Why.module.css";

function Why() {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <div className={styles.title}>
          <h1>
            <span>؟</span>
            <Image
              className={styles.shape}
              src="/images/Group 7.svg"
              alt="question"
              width={34}
              height={38}
            />
            <Image
              className={styles.circle}
              src="/images/Group 7 (1).svg"
              alt="circle question"
              width={34}
              height={38}
            />
          </h1>
          <h2>
            چرا <span className={styles.torino}>تورینو</span> ؟
          </h2>
        </div>
        <div className={styles.content}>
          <h3>تور طبیعت گردی و تاریخی </h3>
          <p>
            اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل
            طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای
            طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و
            آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و
            تاریخی را خریداری کنید.
          </p>
        </div>
      </div>
      <div className={styles.media}>
        <CardSlider slides={slides} />
      </div>
    </div>
  );
}

export default Why;
