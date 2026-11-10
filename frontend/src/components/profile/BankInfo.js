"use client";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { bankShema } from "@/validations/ProfileSchema";
import { useUpdateProfile } from "@/hooks/useProfile";
import { fromApi } from "@/utils/profileMapper";
import styles from "./BankInfo.module.css";

function BankInfo({ profile }) {
  const [isEditing, setIsEditing] = useState(false);
  const { mutateAsync } = useUpdateProfile(profile);
  const current = fromApi(profile);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(bankShema, { stripUnknown: true }),
    defaultValues: current,
  });

  const startEdit = () => {
    reset(fromApi(profile));
    setIsEditing(true);
  };
  const cancel = () => {
    reset(fromApi(profile));
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

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        {/* mobile title is "ویرایش اطلاعات حساب بانکی" while editing, desktop is "اطلاعات حساب بانکی" */}
        <h2 className={styles.title}>
          {isEditing && <span className={styles.editPrefix}>ویرایش </span>}
          اطلاعات حساب بانکی
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
                  placeholder="شماره کارت"
                  aria-label="شماره کارت"
                  inputMode="numeric"
                  maxLength={16}
                  aria-invalid={!!errors.cardNumber}
                  {...register("cardNumber")}
                />
                {errors.cardNumber && (
                  <span className={styles.error} role="alert">
                    {errors.cardNumber.message}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <input
                  className={styles.input}
                  placeholder="شماره حساب"
                  aria-label="شماره حساب"
                  inputMode="numeric"
                  aria-invalid={!!errors.accountNumber}
                  {...register("accountNumber")}
                />
                {errors.accountNumber && (
                  <span className={styles.error} role="alert">
                    {errors.accountNumber.message}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <input
                  className={styles.input}
                  placeholder="شماره شبا"
                  aria-label="شماره شبا"
                  maxLength={26}
                  aria-invalid={!!errors.sheba}
                  {...register("sheba")}
                />
                {errors.sheba && (
                  <span className={styles.error} role="alert">
                    {errors.sheba.message}
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
              <span>شماره کارت</span>
              <span className={styles.value}>
                {current.cardNumber ? digitsEnToFa(current.cardNumber) : "—"}
              </span>
            </div>
            {/* mobile order: card, sheba, account. desktop order: sheba, card, account (see .shebaRow) */}
            <div className={`${styles.row} ${styles.shebaRow}`}>
              <span>شماره شبا</span>
              <span className={`${styles.value} ${styles.ltr}`}>
                {current.sheba || "—"}
              </span>
            </div>
            <div className={styles.row}>
              <span>شماره حساب</span>
              <span className={styles.value}>
                {current.accountNumber
                  ? digitsEnToFa(current.accountNumber)
                  : "—"}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default BankInfo;
