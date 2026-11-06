import { getTour, getTours } from "@/services/tours";
import { useQuery } from "@tanstack/react-query";

function useTours(filters) {
  return useQuery({
    queryKey: ["tours"],
    queryFn: () => getTours(filters),
  });
}

function useTour(id) {
  return useQuery({
    queryKey: ["tour",id],
    queryFn: ()=>getTour(id),
  });
}

export { useTours, useTour };
