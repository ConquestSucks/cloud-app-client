import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileDelete } from "../api/fileDelete";

export const useFileDelete = () => {
    const queryClient = useQueryClient();
    
    return useMutation<number, Error, string>({
        mutationFn: fileDelete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['files'] });
        }
    });
}
