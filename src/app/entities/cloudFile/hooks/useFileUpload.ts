import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileUpload } from "../api/fileUpload";
import { AxiosProgressEvent } from "axios";

export interface FileUploadParams {
    file: File;
    connectionId: string;
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void;
}

export const useFileUpload = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ file, connectionId, onUploadProgress }: FileUploadParams) => {
            return fileUpload(file, { connectionId, onUploadProgress });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["files"] });
        }
    });
};
