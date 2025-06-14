import { BaseEntity } from "@/app/shared/model/types";
import { CloudFile } from "../../cloudFile/model/types";
import { CloudFolder } from "../../cloudFolder/model/types";

export interface User extends BaseEntity{ 
    freeDiskSpaceLeft: number;
    diskSpaceLeft: number;
    cloudFiles?: CloudFile[];
    cloudFolders?: CloudFolder[];
}
