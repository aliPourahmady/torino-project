"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./Traveler.module.css";

const DateField = dynamic(() => import("@/ui/DateField"), { ssr: false });

function PassengerForm({ onSubmit }) {
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PassengerForm),
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
    >
      <h2 className={styles.title}>
        <Image src="/images/profile.svg" width={24} height={24} alt="" />
        مشخصات مسافر
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

      <div className={styles.field}>
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
            <DateField placeholder="تاریخ تولد" onChange={field.onChange} />
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
