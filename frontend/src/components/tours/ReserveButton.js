"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { useAddToBasket } from "@/hooks/useBasket";
import { openModal } from "@/store/features/auth/authSlice";

function ReserveButton({ tourId, className }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { mutate, isPending } = useAddToBasket();

  const clickHandler = () => {
    mutate(tourId, {
      onSuccess: () => router.push("/checkout"),
      onError: (error) => {
        if (error.status === 401 || error.status === 403) {
          dispatch(openModal({ redirectTo: `/tours/${tourId}` }));
          toast.error("لطفا برای خرید و رزرو به حساب خود وارد شوید");
        } else {
          toast.error(
            error.message ?? "افزودن تور به سبد خرید با مشکل مواجه شد.",
          );
        }
      },
    });
  };

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={clickHandler}
        disabled={isPending}
      >
        {isPending ? "در حال افزودن..." : "رزرو و خرید"}
      </button>
    </>
  );
}

export default ReserveButton;
