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
        <div className={`${styles.file} flex gap-2 items-center justify-between p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 hover:shadow-lg hover:scale-[1.01] duration-300 ease-in-out transform`}>
            <div className="grid grid-cols-[5%_30%_20%_1fr] w-[80%] gap-10">
                <FilePreview extension={data.extension} />
                <span className="my-auto text-ellipsis text-clip overflow-hidden text-gray-700">{data.name}{data.extension ? `.${data.extension}` : ''}</span>
                <span className="my-auto text-ellipsis text-gray-600">{formatDate(data.modifiedAt)}</span>
                <span className="my-auto text-ellipsis text-gray-600">{formatBytes(data.size)}</span>
            </div>
            <div className={`${styles["file-buttons"]} flex gap-2 align-center`}>
                <button className="hover:bg-blue-100 p-2 rounded-full transition-colors duration-200">
                    <IosShareIcon sx={{ color: '#4B5563', fontSize: 20 }} />
                </button>
                <button className="hover:bg-blue-100 p-2 rounded-full transition-colors duration-200">
                    <DownloadIcon sx={{ color: '#4B5563', fontSize: 20 }} />
                </button>
                <button className="hover:bg-blue-100 p-2 rounded-full transition-colors duration-200">
                    <EditIcon sx={{ color: '#4B5563', fontSize: 20 }} />
                </button>
            </div>
        </div>
    );
};

export default FileItem;
