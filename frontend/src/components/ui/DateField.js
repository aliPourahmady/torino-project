"use client";
import { useState } from "react";
import Image from "next/image";
import { DatePicker } from "zaman";

import styles from "./Datefield.module.css";

function DateField({ onChange, placeholder = "تاریخ" }) {
  const [value, setValue] = useState({ from: null, to: null });
  const [pickerKey, setPickerKey] = useState(0);
  const hasValue = value.from || value.to;

  const handleChange = (e) => {
    const next = { from: e.from ?? null, to: e.to ?? null };
    setValue(next);
    onChange?.(next);

    if (next.from && next.to) setPickerKey((k) => k + 1);
  };

  const handleClear = () => {
    const empty = { from: null, to: null };
    setValue(empty);
    setPickerKey((k) => k + 1);
     // remount -> empty input
    onChange?.(empty);
  };

  return (
    <div className={styles.container}>
      <Image
        className={styles.icon}
        src="/images/calendar (1).svg"
        width={20}
        height={20}
        alt=""
      />
      <DatePicker
        key={pickerKey}
        range
        from={value.from ?? undefined}
        to={value.to ?? undefined}
        className={styles.picker}
        inputClass={styles.input}
        inputAttributes={{ placeholder, readOnly: true }}
        accentColor="#28a745"
        round="x2"
        locale="fa"
        direction="rtl"
        weekend={[6]}
        position="center"
        onChange={handleChange}
      />
      {hasValue && (
        <button
          type="button"
          className={styles.clear}
          onClick={handleClear}
          aria-label="پاک کردن تاریخ"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default DateField;
