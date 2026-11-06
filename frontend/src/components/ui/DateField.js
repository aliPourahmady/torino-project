"use client";
import Image from "next/image";
import { DatePicker } from "zaman";

import styles from "./Datefield.module.css";

function DateField({ onChange, placeholder = "تاریخ" }) {
  return (
    <div className={styles.wrapper}>
      <Image
        className={styles.icon}
        src="/images/calendar (1).svg"
        width={20}
        height={20}
        alt=""
      />
      <DatePicker
        range
        className={styles.picker}
        inputClass={styles.input}
        inputAttributes={{ placeholder, readOnly: true }}
        accentColor="#28a745"
        round="x2"
        locale="fa"
        direction="rtl"
        weekend={[6]}
        position="center"
        onChange={(e) => onChange?.({ from: e.from, to: e.to })}
      />
    </div>
  );
}

export default DateField;
