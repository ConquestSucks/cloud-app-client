import { useQuery } from "@tanstack/react-query";
import { getSelfUser, UserDto } from "../api/getSelfUser";

export const useGetSelfUser = () => {
    return useQuery<UserDto>({
        queryKey: ["selfUser"],
        queryFn: getSelfUser,
        refetchOnWindowFocus: false,
    });
}; 