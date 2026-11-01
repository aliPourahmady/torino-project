"use client";
import Image from "next/image";
import { Calendar, CalendarProvider, DatePicker } from "zaman";

import styles from "./Datefield.module.css";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";

function DateField({ onChange, placeholder = "تاریخ" }) {
  return (
    <div className={styles.wrapper}>
      <Image
        className={styles.icon}
        src="/images/calendar (1).svg"
        width={18}
        height={18}
        alt=""
      />
      <DatePicker
        locale="fa"
        className={styles.picker}
        inputClass={styles.input}
        inputAttributes={{ placeholder, readOnly: true }}
        accentColor="#28a745"
        round="x2"
        direction="rtl"
        weekend={[6]}
        position="center"
        customShowDateFormat="YYYY/MM/DD"
        onChange={(e) => onChange?.(e.value)}
      />
    </div>
  );
}

export default DateField;
