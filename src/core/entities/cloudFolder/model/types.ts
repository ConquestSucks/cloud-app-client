import { BaseEntity } from "@/core/shared/model/types";
import { User } from "../../user/model/types";

export interface CloudFolder extends BaseEntity { 
    user: User;
    parentFolderId: number;
    publlicUrl?: string;
    subFolders?: CloudFolder[];
}
