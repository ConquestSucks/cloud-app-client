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
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col gap-10 p-10 rounded-xl bg-[#212020] max-h-[90%]">
                        {fileList && <DisplayModalFileList fileList={fileList} />}
                        <div className="flex justify-end gap-2">
                            <Button variant="outlined" onClick={handleCloseModal} disabled={isPending}>
                                Отменить
                            </Button>
                            <Button variant="contained" onClick={handleForm} loading={isPending}
                                sx={{
                                    '&.MuiButton-loading': {
                                        backgroundColor: '#1565C0',
                                    },
                                    '& .MuiButton-loadingIndicator': {
                                        color: 'white'
                                    }
                                }}
                            >
                                Продолжить
                            </Button>
                        </div>
                        {error && <span>error</span>}
                    </div>
                </div>
            </Modal>
        </form>
    );
};

export default FileUploadForm;