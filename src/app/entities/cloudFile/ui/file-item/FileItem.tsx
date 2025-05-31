import React from "react";
import { CloudFile } from "../../model/types";
import IosShareIcon from '@mui/icons-material/IosShare';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import { formatBytes } from "../../lib/formatBytes";
import { formatDate } from "../../lib/formatDate";
import styles from "./FileItem.module.css"
import FilePreview from "./FilePreview";

const FileItem = ({ data }: { data: CloudFile }) => {
    return (
        <div className={`${styles.file} flex gap-2 items-center justify-between p-3 bg-[#212020] rounded-xl border-2 border-[#1565C0] hover:border-inherit duration-[0.3s]`}>
            <div className="grid grid-cols-[5%_30%_20%_1fr] w-[80%] gap-10">
                <FilePreview extension={data.extension} />
                <span className="my-auto text-ellipsis text-clip overflow-hidden">{data.name}{data.extension ? `.${data.extension}` : ''}</span>
                <span className="my-auto text-ellipsis">{formatDate(data.modifiedAt)}</span>
                <span className="my-auto text-ellipsis">{formatBytes(data.size)}</span>
            </div>
            <div className={`${styles["file-buttons"]} flex gap-2 align-center`}>
                <button><IosShareIcon /></button>
                <button><DownloadIcon /></button>
                <button><EditIcon /></button>
            </div>
        </div>
    );
};

export default FileItem;
