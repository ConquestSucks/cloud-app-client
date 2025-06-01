import { useMutation, } from "@tanstack/react-query";
import { downloadFile } from "../api/downloadFile";

export const useDownloadFile = () => {
  return useMutation<number, Error, string>({
    mutationFn: (key: string) => downloadFile(key),
  });
};
