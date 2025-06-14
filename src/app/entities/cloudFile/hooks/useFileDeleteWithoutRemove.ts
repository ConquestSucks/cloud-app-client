import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileDeleteWithoutRemove } from "../api/fileDeleteWithoutRemove";

export const useFileDeleteWithoutRemove = () => {
    const queryClient = useQueryClient();
    
    return useMutation<number, Error, string>({
        mutationFn: fileDeleteWithoutRemove,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userFiles"] });
        }
    });
}
