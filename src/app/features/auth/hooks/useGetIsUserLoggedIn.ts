import { useQuery } from "@tanstack/react-query"
import { getIsUserLoggedIn } from "../../api/getIsUserLoggedIn"
import { AxiosError } from "axios";

export const useGetIsUserLoggedIn = () => {
    return useQuery({
        queryKey: ["isAuthenticated"],
        queryFn: getIsUserLoggedIn,
        retry: (failureCount, error: AxiosError) => {
            if (error?.response?.status === 401) {
                return false;
            }

            return failureCount < 3;
        }
    })
}