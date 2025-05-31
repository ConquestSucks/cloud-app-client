import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getFiles } from "../api/getFiles";
import { GetFilesResponse } from "../model/types";

export const useGetFiles = (
  pageNumber: number,
  pageSize: number,
  deletedFiles: boolean = false
) => {
  return useQuery<GetFilesResponse, Error>({
    queryKey: ["userFiles", pageNumber, pageSize, deletedFiles],
    queryFn: () => getFiles(pageNumber, pageSize, deletedFiles),
    placeholderData: keepPreviousData
  });
};
