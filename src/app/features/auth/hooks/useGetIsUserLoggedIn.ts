import { useQuery } from "@tanstack/react-query"
import { getIsUserLoggedIn } from "../../api/getIsUserLoggedIn"

export const useGetIsUserLoggedIn = () => {
    return useQuery({
        queryKey: ["isAuthenticated"],
        queryFn: getIsUserLoggedIn,
        retry: (failureCount, error: any) => {
            if (error?.response?.status === 401) {
                return false;
            }

            return failureCount < 3;
        }
    })
}