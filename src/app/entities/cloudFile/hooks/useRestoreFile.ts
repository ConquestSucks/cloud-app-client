import { useMutation } from "@tanstack/react-query";
import { restoreFile } from "../api/restoreFile";

export const useRestoreFile = () => {
    return useMutation<number, Error, string>({
        mutationFn: restoreFile
    });
}
