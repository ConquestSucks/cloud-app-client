import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getFiles } from "../api/getFiles";
import { GetFilesParams, GetFilesResponse } from "../model/types";

export const useGetFiles = (params: GetFilesParams) => {
  return useQuery<GetFilesResponse, Error>({
    queryKey: ["userFiles", params],
    queryFn: () => getFiles(params),
    placeholderData: keepPreviousData
  });
};
