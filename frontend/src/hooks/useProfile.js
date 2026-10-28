import { getProfile } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
  });
}
