import { BaseEntity } from "@/app/shared/model/types";
import { CloudFolder } from "../../cloudFolder/model/types";
import { User } from "../../user/model/types";

export interface CloudFile extends BaseEntity { 
    user: User;
    cloudFolder?: CloudFolder;
    publicUrl?: string;
    size: number;
    extension: string;
    downloadCount: number;
}

export type UploadFileParams = {
  file: File;
  metadata: Partial<CloudFile>;
};

export interface UpdateFile {
    id: number
}

export interface DeleteFile {
    id: number
}