"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useBasket } from "@/hooks/useBasket";
import { useCreateOrder } from "@/hooks/useOrder";
import PassengerForm from "./PassengerForm";
import OrderSummary from "./OrderSummary";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";

import styles from "./CheckOutPage.module.css";

function CheckOutPage() {
  const router = useRouter();
  const { data: profile } = useProfile();
  const { mutate: updateProfile } = useUpdateProfile();
  const { data: basket, isLoading, error } = useBasket();
  const { mutate, isPending } = useCreateOrder();

  const onSubmit = (values) => {
    updateProfile(values);
    mutate(values, {
      onSuccess: () => router.push("/profile/my-tours"),
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
          <PassengerForm
            onSubmit={onSubmit}
            title="مشخصات مسافر"
            profile={profile}
          />
        </div>
        <OrderSummary basket={basket} isPending={isPending} />
      </div>
    </div>
  );
}

export default CheckOutPage;
