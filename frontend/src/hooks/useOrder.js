import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "@/services/order";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrder,
  });
};
