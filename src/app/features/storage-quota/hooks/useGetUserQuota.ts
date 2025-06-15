import { useQuery } from "@tanstack/react-query";
import { getUserQuota, QuotaItem } from "../api/getUserQuota";

export const useGetUserQuota = () => {
    return useQuery<QuotaItem[]>({
        queryKey: ["userQuota"],
        queryFn: getUserQuota,
        refetchOnWindowFocus: false,
    });
}; 