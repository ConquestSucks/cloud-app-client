import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileUpload } from "../api/fileUpload";

export interface FileUploadParams {
    file: File;
    options?: {
        connectionId?: string;
    };
}

export const useFileUpload = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ file, options }: FileUploadParams) => {
            return fileUpload(file, options);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userFiles"] });
        }
    });
};
