import { useMutation } from "@tanstack/react-query";
import { CustomError, LoginData, ServerResponse } from "../model/types";
import { postUserLogin } from "../api/postUserLogin";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const usePostUserLogin = (router: AppRouterInstance) => {
    return useMutation<ServerResponse, CustomError, LoginData>({
        mutationFn: postUserLogin,
        onSuccess: () => {
            router.push("/dashboard");
        }
    })
};