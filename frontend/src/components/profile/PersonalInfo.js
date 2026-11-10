"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Calendar, CalendarProvider } from "zaman";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { personalSchema } from "@/validations/ProfileSchema";
import { useUpdateProfile } from "@/hooks/useProfile";
import { fromApi, GENDERS } from "@/utils/profileMapper";
import styles from "./PersonalInfo.module.css";

function PersonalInfo({ profile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dateRef = useRef(null);
  const { mutateAsync } = useUpdateProfile(profile);
  const current = fromApi(profile);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(personalSchema, { stripUnknown: true }),
    defaultValues: current,
  });

  // close the calendar when clicking outside of the birth date field
  useEffect(() => {
    if (!isCalendarOpen) return;
    const closeOnOutsideClick = (e) => {
      if (!dateRef.current?.contains(e.target)) setIsCalendarOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [isCalendarOpen]);

  const startEdit = () => {
    reset(fromApi(profile));
    setIsEditing(true);
  };
  const cancel = () => {
    reset(fromApi(profile));
    setIsCalendarOpen(false);
    setIsEditing(false);
  };

  const onSubmit = async (values) => {
    try {
      await mutateAsync(values);
      setIsEditing(false);
    } catch {
      // the hook already shows the error toast
    }
  };

  const genderLabel = GENDERS.find((g) => g.value === current.gender)?.label;
  const birthDate = current.birthDate
    ? current.birthDate.toLocaleDateString("fa-IR")
    : null;

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        {/* mobile title is "ویرایش اطلاعات شخصی" while editing, desktop is "اطلاعات شخصی" */}
        <h2 className={styles.title}>
          {isEditing && <span className={styles.editPrefix}>ویرایش </span>}
          اطلاعات شخصی
        </h2>
        {!isEditing && (
          <button type="button" className={styles.editBtn} onClick={startEdit}>
            <Image src="/images/edit-2.svg" width={16} height={16} alt="" />
            ویرایش اطلاعات
          </button>
        )}
      </header>

      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.body}>
            <div className={styles.fields}>
              <div className={styles.field}>
                <input
                  className={styles.input}
                  placeholder="نام و نام خانوادگی"
                  aria-label="نام و نام خانوادگی"
                  autoComplete="name"
                  aria-invalid={!!errors.fullName}
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <span className={styles.error} role="alert">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <input
                  className={styles.input}
                  placeholder="کدملی"
                  aria-label="کدملی"
                  inputMode="numeric"
                  maxLength={10}
                  aria-invalid={!!errors.nationalCode}
                  {...register("nationalCode")}
                />
                {errors.nationalCode && (
                  <span className={styles.error} role="alert">
                    {errors.nationalCode.message}
                  </span>
                )}
              </div>

              {/* birthDate is third on desktop, last on mobile (see .birthField) */}
              <div className={`${styles.field} ${styles.birthField}`}>
                <div className={styles.dateWrap} ref={dateRef}>
                  <Controller
                    control={control}
                    name="birthDate"
                    render={({ field }) => (
                      <>
                        <input
                          readOnly
                          className={`${styles.input} ${styles.dateInput}`}
                          placeholder="تاریخ تولد"
                          aria-label="تاریخ تولد"
                          aria-invalid={!!errors.birthDate}
                          value={
                            field.value
                              ? new Date(field.value).toLocaleDateString(
                                  "fa-IR",
                                  {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                  },
                                )
                              : ""
                          }
                          onClick={() => setIsCalendarOpen((open) => !open)}
                        />
                        {isCalendarOpen && (
                          <div className={styles.calendarPopup}>
                            <CalendarProvider
                              locale="fa"
                              direction="rtl"
                              accentColor="#28a745"
                              round="x2"
                            >
                              <Calendar
                                defaultValue={field.value || new Date()}
                                onChange={(e) => {
                                  field.onChange(new Date(e.value));
                                  setIsCalendarOpen(false);
                                }}
                              />
                            </CalendarProvider>
                          </div>
                        )}
                      </>
                    )}
                  />
                  <Image
                    className={styles.dateIcon}
                    src="/images/calendar.svg"
                    width={16}
                    height={16}
                    alt=""
                  />
                </div>
                {errors.birthDate && (
                  <span className={styles.error} role="alert">
                    {errors.birthDate.message}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <div className={styles.selectWrap}>
                  <label htmlFor="gender" className={styles.selectLabel}>
                    جنسیت
                  </label>
                  <select
                    id="gender"
                    className={`${styles.input} ${styles.select}`}
                    aria-invalid={!!errors.gender}
                    {...register("gender")}
                  >
                    <option value="" disabled>
                      انتخاب کنید
                    </option>
                    {GENDERS.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                  <Image
                    className={styles.selectArrow}
                    src="/images/arrow-down.svg"
                    width={16}
                    height={16}
                    alt=""
                  />
                </div>
                {errors.gender && (
                  <span className={styles.error} role="alert">
                    {errors.gender.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.confirm}
              disabled={isSubmitting}
            >
              تایید
            </button>
            <button type="button" className={styles.cancel} onClick={cancel}>
              انصراف
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.body}>
          <div className={styles.grid}>
            <div className={styles.row}>
              <span>نام و نام خانوادگی</span>
              <span className={`${styles.value} ${styles.bold}`}>
                {current.fullName || "—"}
              </span>
            </div>
            <div className={styles.row}>
              <span>کدملی</span>
              <span className={styles.value}>
                {current.nationalCode
                  ? digitsEnToFa(current.nationalCode)
                  : "—"}
              </span>
            </div>
            <div className={styles.row}>
              <span>جنسیت</span>
              <span className={`${styles.value} ${styles.bold}`}>
                {genderLabel || "—"}
              </span>
            </div>
            <div className={styles.row}>
              <span>تاریخ تولد</span>
              <span className={styles.value}>{birthDate || "—"}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PersonalInfo;
