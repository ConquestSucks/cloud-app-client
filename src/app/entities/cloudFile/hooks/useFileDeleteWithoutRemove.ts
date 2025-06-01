import { useMutation } from "@tanstack/react-query";
import { fileDeleteWithoutRemove } from "../api/fileDeleteWithoutRemove";

export const useFileDeleteWithoutRemove = () => {
    return useMutation<number, Error, string>({
        mutationFn: fileDeleteWithoutRemove
    });
}
