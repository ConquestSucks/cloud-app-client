import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileUpload } from "../api/fileUpload";

export const useFileUpload = () => {
    const queryClient = useQueryClient();
    
    return useMutation<number, Error, File>({
        mutationFn: fileUpload,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userFiles"] });
        }
    });
}
