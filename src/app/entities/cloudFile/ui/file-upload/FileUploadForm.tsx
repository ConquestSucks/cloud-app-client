import React, { useEffect, useState } from "react";
import { checkSelectedFilesSize } from "../../lib/checkFileSize";
import { useFileUpload } from "../../hooks/useFileUpload";
import { Button, Modal, styled } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DisplayModalFileList from "./DisplayModalFileList";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const FileUploadForm = () => {
    const [fileList, setFileList] = useState<FileList | null>(null);
    const [openModal, setModalOpen] = useState(false);
    const { mutateAsync, error, isPending } = useFileUpload();

    useEffect(() => {
        if (fileList && fileList.length) setModalOpen(true);
    }, [fileList])

    const handleCloseModal = () => {
        setModalOpen(false);
        setFileList(null);
    }

    const handleForm = async () => {
        if (!fileList) return;

        if (!checkSelectedFilesSize(fileList)) return;

        const files = Array.from(fileList);

        for (const file of files) {
            try {
                await mutateAsync(file);
            } catch (error) {
                console.log(error)
            }
        }

        setFileList(null);
        setModalOpen(false);
    };

    return (
        <form>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Загрузить
                <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => setFileList(e.target.files)}
                    multiple
                />
            </Button>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="backdrop-blur-sm"
            >
                <div className="flex items-center justify-center h-full p-4">
                    <div className="flex flex-col gap-6 p-8 rounded-xl bg-white shadow-xl w-full max-w-[800px] min-w-[600px] min-h-[400px] animate-modal-appear">
                        {fileList && <DisplayModalFileList fileList={fileList}/>}
                        <div className="flex justify-end gap-3 mt-auto">
                            <Button 
                                variant="outlined" 
                                onClick={handleCloseModal} 
                                disabled={isPending}
                                sx={{
                                    borderColor: '#E5E7EB',
                                    color: '#4B5563',
                                    '&:hover': {
                                        borderColor: '#D1D5DB',
                                        backgroundColor: '#F9FAFB'
                                    }
                                }}
                            >
                                Отменить
                            </Button>
                            <Button 
                                variant="contained" 
                                onClick={handleForm} 
                                disabled={isPending}
                                sx={{
                                    backgroundColor: '#2563EB',
                                    '&:hover': {
                                        backgroundColor: '#1D4ED8'
                                    },
                                    '&:disabled': {
                                        backgroundColor: '#93C5FD'
                                    }
                                }}
                            >
                                {isPending ? 'Загрузка...' : 'Продолжить'}
                            </Button>
                        </div>
                        {error && (
                            <div className="text-red-500 text-sm mt-2">
                                Произошла ошибка при загрузке файлов. Пожалуйста, попробуйте снова.
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </form>
    );
};

export default FileUploadForm;