"use client";
import { OTPInput } from "input-otp";
import { useState } from "react";
import styles from "./CheckOtpModal.module.css";
import {
  closeModal,
  setMobile,
  setStep,
} from "@/store/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { OtpTimer } from "@siamf/otp-timer";
import { toast, Toaster } from "sonner";
import { checkOtp, sendOtp } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

function CheckOtpModal() {
  const { isOpen, step, mobile, redirectAfterLogin } = useSelector(
    (state) => state.authModal,
  );
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  if (!isOpen || step !== "otp") return null;

  const submitHandler = async () => {
    try {
      await checkOtp(mobile, otp);
      toast.success("با موفقیت وارد شدید", { position: "top-right" });
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      dispatch(closeModal());
    } catch (er) {
      toast.error("کد صحیح نمی باشد.", { position: "top-right" });
    }
  };
  const resendHandler = async () => {
    try {
      await sendOtp(mobile);
      toast.success("کد جدید ارسال شد");
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
          src="images/Line arrow-left.svg"
          width={24}
          height={24}
          onClick={() => dispatch(setStep("mobile"))}
          alt="close"
        />
        <div className={styles.content}>
          <h3>کد تایید را وارد کنید.</h3>
          <p>کد تایید به شماره {mobile} ارسال شد</p>
        </div>

        <div dir="ltr" className={styles.form}>
          <OTPInput
            value={otp}
            onChange={setOtp}
            maxLength={6}
            onComplete={submitHandler}
            render={({ slots }) => (
              <div className={styles.slots}>
                {slots.map((slot, i) => (
                  <div
                    key={i}
                    className={`${styles.slot} ${slot.isActive ? styles.active : ""}`}
                  >
                    {slot.char}
                    {slot.hasFakeCaret && <div className={styles.caret} />}
                  </div>
                ))}
              </div>
            )}
          />
          <OtpTimer
            minutes={1}
            seconds={25}
            onResend={resendHandler}
            renderText={({ minutes, seconds }) => (
              <p className={styles.timer}>
                تا ارسال مجدد کد
                <span>{`${minutes}:${String(seconds).padStart(2, "0")}`}</span>{" "}
              </p>
            )}
            renderButton={(props) => (
              <button {...props} className={styles.resend}>
                ارسال مجدد کد
              </button>
            )}
          />
        </div>
        <button className={styles.btn} onClick={submitHandler}>
          ورود به تورینو
        </button>
      </div>
      <Toaster richColors />
    </div>
  );
}

export default CheckOtpModal;
