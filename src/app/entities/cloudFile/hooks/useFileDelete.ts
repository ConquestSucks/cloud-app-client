import { useMutation } from "@tanstack/react-query";
import { fileDelete } from "../api/fileDelete";

export const useFileDelete = () => {
    return useMutation<number, Error, string>({
        mutationFn: fileDelete
    });
}
