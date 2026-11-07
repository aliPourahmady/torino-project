"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { useBasket } from "@/hooks/useBasket";
import { useCreateOrder } from "@/hooks/useOrder";
import { openModal } from "@/store/features/auth/authSlice";

import PassengerForm from "./PassengerForm";
import OrderSummary from "./OrderSummary";
import styles from "./CheckOutPage.module.css";

function CheckOutPage() {
  const router = useRouter();
  const { data: basket, isLoading, error } = useBasket();
  const { mutate, isPending } = useCreateOrder();

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: () => router.push("/checkout/success"),
      onError: (err) =>
        toast.error(
          err.response?.data?.message ?? "ثبت سفارش با مشکل مواجه شد.",
        ),
    });
  };

  if (isLoading) return <p className={styles.message}>در حال بارگذاری...</p>;
  if (error || !basket) {
    return <p className={styles.message}>سبد خرید شما در دسترس نیست.</p>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.form}>
          <PassengerForm onSubmit={onSubmit} />
        </div>
        <OrderSummary basket={basket} isPending={isPending} />
      </div>
    </div>
  );
}

export default CheckOutPage;
