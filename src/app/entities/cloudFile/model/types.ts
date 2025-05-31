import { BaseEntity } from "@/app/shared/model/types";
import { CloudFolder } from "../../cloudFolder/model/types";
import { User } from "../../user/model/types";

export interface CloudFile extends BaseEntity {
    key: string; 
    user: User;
    cloudFolder?: CloudFolder;
    publicUrl?: string;
    size: number;
    extension: string;
    downloadCount: number;
}