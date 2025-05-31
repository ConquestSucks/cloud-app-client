import { useMutation } from "@tanstack/react-query";
import { fileUpload } from "../api/fileUpload";


export const useFileUpload = () => {
    return useMutation<number, Error, File>({
        mutationFn: fileUpload,
        onSuccess: () => {
            alert("Файл успешно загружен")
        }
    });
}
