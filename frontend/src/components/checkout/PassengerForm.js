"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./PassengerForm.module.css";
import { passengerSchema } from "@/validations/PassengerSchema";

const DatePicker = dynamic(() => import("zaman").then((m) => m.DatePicker), {
  ssr: false,
});

function PassengerForm({ onSubmit, title }) {
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passengerSchema),
    defaultValues: {
      fullName: "",
      nationalCode: "",
      gender: "",
      birthDate: null,
    },
  });

  const gender = watch("gender");

  return (
    <form
      id="passenger-form"
      className={styles.card}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h2 className={styles.title}>
        <Image src="/images/profile.svg" width={24} height={24} alt="" />
        {title}
      </h2>

      <div className={styles.field}>
        <input placeholder="نام و نام خانوادگی" {...register("fullName")} />
        {errors.fullName && (
          <span className={styles.error}>{errors.fullName.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <input
          placeholder="کد ملی"
          inputMode="numeric"
          maxLength={10}
          {...register("nationalCode")}
        />
        {errors.nationalCode && (
          <span className={styles.error}>{errors.nationalCode.message}</span>
        )}
      </div>

      <div className={`${styles.field} ${styles.gender}`}>
        <select
          className={`${styles.select} ${gender ? "" : styles.placeholder}`}
          {...register("gender")}
        >
          <option value="" disabled hidden>
            جنسیت
          </option>
          <option value="male">مرد</option>
          <option value="female">زن</option>
        </select>
        {errors.gender && (
          <span className={styles.error}>{errors.gender.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <Controller
          name="birthDate"
          control={control}
          render={({ field }) => (
            <div className={styles.dateWrapper}>
              <DatePicker
                className={styles.picker}
                inputClass={styles.dateInput}
                inputAttributes={{ placeholder: "تاریخ تولد", readOnly: true }}
                accentColor="#28a745"
                round="x2"
                locale="fa"
                direction="rtl"
                weekend={[6]}
                position="center"
                to={new Date()}
                onChange={(e) => field.onChange(e.value)}
              />

              <Image
                className={styles.icon}
                src="/images/calendar (1).svg"
                width={20}
                height={20}
                alt=""
              />
            </div>
          )}
        />
        {errors.birthDate && (
          <span className={styles.error}>{errors.birthDate.message}</span>
        )}
      </div>
    </form>
  );
}

export default PassengerForm;
