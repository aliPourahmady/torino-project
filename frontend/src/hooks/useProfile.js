import {
  getProfile,
  getUserTours,
  getUserTransactions,
  putProfile,
} from "@/services/user";
import { fromApi, toApi } from "@/utils/profileMapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
  });
}
export function useUpdateProfile(profile) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formValues) =>
      putProfile(toApi({ ...fromApi(profile), ...formValues })),
    onSuccess: async () => {
      toast.success("اطلاعات با موفقیت ذخیره شد");
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      toast.error("ذخیره اطلاعات با مشکل مواجه شد. لطفا دوباره تلاش کنید.");
    },
  });
}
export function useUserTours() {
  return useQuery({
    queryKey: ["profile-tours"],
    queryFn: getUserTours,
    retry: false,
  });
}
export function useUserTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getUserTransactions,
    retry: false,
  });
}
