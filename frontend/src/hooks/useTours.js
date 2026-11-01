import { getTour, getTours } from "@/services/tours";
import { useQuery } from "@tanstack/react-query";

function useTours() {
  return useQuery({
    queryKey: ["tours"],
    queryFn: getTours,
    retry: false,
  });
}

function useTour() {
  return useQuery({
    queryKey: ["tour"],
    queryFn: getTour,
  });
}

export { useTours, useTour };
