import { useQuery } from "@tanstack/react-query"
import { getIsUserLoggedIn } from "../api"

export const useGetIsUserLoggedIn = () => {
    return useQuery({
        queryKey: ["isAuthenticated"],
        queryFn: getIsUserLoggedIn
    })
}