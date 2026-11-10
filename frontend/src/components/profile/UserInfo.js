"use client";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { emailSchema } from "@/validations/ProfileSchema";
import { useUpdateProfile } from "@/hooks/useProfile";
import { fromApi } from "@/utils/profileMapper";
import styles from "./UserInfo.module.css";

function UserInfo({ profile }) {
  const [isEditing, setIsEditing] = useState(false);
  const { mutateAsync } = useUpdateProfile(profile);
  const current = fromApi(profile);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(emailSchema, { stripUnknown: true }),
    defaultValues: current,
  });

  const startEdit = () => {
    reset(fromApi(profile));
    setIsEditing(true);
  };

  const onSubmit = async (values) => {
    try {
      await mutateAsync(values);
      setIsEditing(false);
    } catch {}
  };

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <h2 className={styles.title}>اطلاعات حساب کاربری</h2>
      </header>

      <div className={styles.userBody}>
        <div className={styles.row}>
          <span>شماره موبایل</span>
          <span className={styles.value}>
            {profile.mobile ? digitsEnToFa(profile.mobile) : "—"}
          </span>
        </div>

        {isEditing ? (
          <form
            className={styles.inlineForm}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className={styles.field}>
              <input
                className={styles.input}
                placeholder="آدرس ایمیل"
                aria-label="آدرس ایمیل"
                inputMode="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <span className={styles.error} role="alert">
                  {errors.email.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className={styles.confirm}
              disabled={isSubmitting}
            >
              تایید
            </button>
            <button
              type="button"
              className={styles.cancel}
              onClick={() => setIsEditing(false)}
            >
              انصراف
            </button>
          </form>
        ) : (
          <>
            <div className={styles.row}>
              <span>ایمیل</span>
              <span className={`${styles.value} ${styles.ltr}`}>
                {current.email || "—"}
              </span>
            </div>
            <button
              type="button"
              className={styles.editBtn}
              onClick={startEdit}
            >
              <Image src="/images/edit-2.svg" width={16} height={16} alt="" />
              {current.email ? "ویرایش" : "افزودن"}
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default UserInfo;
