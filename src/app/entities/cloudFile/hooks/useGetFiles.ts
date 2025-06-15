import { getFiles } from "../api/getFiles";
import { GetFilesParams, GetFilesResponse } from "../model/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

type UseGetFilesOptions = Omit<UseQueryOptions<GetFilesResponse, AxiosError>, 'queryKey' | 'queryFn'>;

export const useGetFiles = (params: GetFilesParams, options?: UseGetFilesOptions) => {
    return useQuery<GetFilesResponse, AxiosError>({
        queryKey: ['files', params],
        queryFn: () => getFiles(params),
        retry: (failureCount, error) => {
            if (error?.response?.status === 401) {
                return false;
            }
            return failureCount < 2;
        },
        ...options,
    });
};
