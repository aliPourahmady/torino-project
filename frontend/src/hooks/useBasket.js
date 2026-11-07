import { getBasket, putTourInBasket } from "@/services/basket";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useBasket = () =>
  useQuery({
    queryKey: ["basket"],
    queryFn: getBasket,
    retry: false,
  });

const useAddToBasket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putTourInBasket,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["basket"] }),
  });
};

export { useAddToBasket, useBasket };
