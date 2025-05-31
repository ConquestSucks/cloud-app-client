import { BaseEntity } from "@/app/shared/model/types";

export interface CloudFile extends BaseEntity {
    userDisplayName: string;
    cloudFolderId?: number;
    publicUrl?: string;
    key: string;
    size: number;
    extension: string;
    downloadCount: number;
}

export interface GetFilesResponse {
    files: CloudFile[];
    headers: {
        "x-total-count": number;
        "x-total-pages": number;
    };
}