import React from "react";
import { CloudFile } from "../model/types";
import Image from "next/image";
import checkFileExtension from "../lib/checkFileExtension";

const FileItem = ({ file }: { file: CloudFile }) => {
    const path = checkFileExtension(file.extension)
    return (
        <div className="flex gap-2">
            <div className="flex gap-5">
                <Image src={path} alt="file" width={40} height={40} />
                <span>{file.name}</span>
                <span>{file.user.name}</span>
                <span>{file.modifiedAt}</span>
                <span>{file.size}</span>
            </div>
            <div className="flex gap-5">
                <button>поделиться</button>
                <button>скачать</button>
                <button>удалить</button>
            </div>
        </div>
    );
};

export default FileItem;
