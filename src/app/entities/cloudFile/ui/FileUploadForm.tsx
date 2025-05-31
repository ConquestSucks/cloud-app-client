import React, { useState } from "react";
import { checkFileSize } from "../lib/checkFileSize";
import { useFileUpload } from "../hooks/useFileUpload";

export const FileUploadForm = () => {
    const [file, setFile] = useState<File | undefined>(undefined);
    const { mutate, error } = useFileUpload();

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) return;

        console.log(file)

        if (checkFileSize(file)) {
            mutate(file);
            return;
        }
    };

    return (
        <form onSubmit={handleForm}>
            <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
            <button type="submit">Отправить</button>
            {error && <span>Ошибка при загрузке файла: {error.message}</span>}
        </form>
    );
};

