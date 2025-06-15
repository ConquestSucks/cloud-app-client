import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restoreFile } from "../api/restoreFile";

export const useRestoreFile = () => {
    const queryClient = useQueryClient();
    
    return useMutation<number, Error, string>({
        mutationFn: restoreFile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['files'] });
        }
    });
}
