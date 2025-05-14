import { useUploadFile } from "@/app/entities/cloudFile/api/uploadFile";
import React, { useState } from "react";

const UploadFile = () => {
    const [file, setFile] = useState<File | undefined>(undefined);
    const { mutate } = useUploadFile();

    const handleForm = () => {
        if (!file) return;

        mutate({
            file,
            metadata: {
                name: file.name,
                extension: file.name.split(".").pop() ?? ""
            },
        });
    };

    return (
        <form onSubmit={handleForm}>
            <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
            <button type="submit">отправить</button>
        </form>
    );
};

export default UploadFile;
