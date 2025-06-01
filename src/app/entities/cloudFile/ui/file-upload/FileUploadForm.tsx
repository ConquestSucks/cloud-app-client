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
                <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col gap-10 p-10 rounded-xl bg-[#212020] max-h-[90%]">
                        {fileList && <DisplayModalFileList fileList={fileList} />}
                        <div className="flex justify-end gap-2">
                            <Button variant="outlined" onClick={handleCloseModal} 
                                disabled={isPending}
                                sx={{
                                    color: '#666666',
                                    borderColor: '#666666',
                                    '&:hover': {
                                        borderColor: '#1976d2',
                                        color: '#1976d2',
                                    }
                                }}
                            >
                                Отменить
                            </Button>
                            <Button variant="contained" onClick={handleForm} loading={isPending}
                                sx={{
                                    backgroundColor: '#1976d2',
                                    color: '#ffffff',
                                    '&:hover': {
                                        backgroundColor: '#1565c0',
                                    },
                                    '&.MuiButton-loading': {
                                        backgroundColor: '#1565c0',
                                    },
                                    '& .MuiButton-loadingIndicator': {
                                        color: '#ffffff'
                                    }
                                }}
                            >
                                Продолжить
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