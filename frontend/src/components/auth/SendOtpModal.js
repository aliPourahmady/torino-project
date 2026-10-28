"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SendOtpModal.module.css";
import { useState } from "react";
import { digitsFaToEn } from "@persian-tools/persian-tools";
import Image from "next/image";
import {
  closeModal,
  setMobile,
  setStep,
} from "@/store/features/auth/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { mobileSchema } from "@/validations/PhoneSchema";
import { sendOtp } from "@/services/auth";
import { toast, Toaster } from "sonner";

function SendOtpModal() {
  const { isOpen, step } = useSelector((state) => state.authModal);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(mobileSchema),
    defaultValues: { mobile: "" },
  });

  if (!isOpen || step !== "mobile") return null;
  const onSubmit = async ({ mobile }) => {
    try {
      await sendOtp(mobile);
      dispatch(setMobile(mobile));
      dispatch(setStep("otp"));
    } catch (er) {
      toast.error("ارسال کد با مشکل مواجه شد لطفا دوباره تلاش کنید.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className={styles.modal} onClick={() => dispatch(closeModal())}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <Image
          src="images/add.svg"
          width={34}
          height={34}
          onClick={() => dispatch(closeModal())}
          alt="close"
        />
        <p>ورود به تورینو</p>
        <form
          className={styles.containerForm}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.form}>
            <label htmlFor="mobile">شماره موبایل خود را وارد کنید</label>
            <input
              type="text"
              placeholder="4253***0912"
              name="mobile"
              id="mobile"
              {...register("mobile")}
            />
            {errors.mobile && (
              <span className={styles.error}>{errors.mobile.message}</span>
            )}
          </div>
          <button type="submit" disabled={isSubmitting}>
            ارسال کد تایید
          </button>
        </form>
      </div>
      <Toaster richColors />
    </div>
  );
}

export default SendOtpModal;
