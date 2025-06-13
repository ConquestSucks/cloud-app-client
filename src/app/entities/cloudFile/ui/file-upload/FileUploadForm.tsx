'use client'

import React, { useEffect, useState } from "react";
import { checkSelectedFilesSize } from "../../lib/checkFileSize";
import { useFileUpload } from "../../hooks/useFileUpload";
import { Button, Modal, styled, CircularProgress } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DisplayModalFileList from "./DisplayModalFileList";
import { signalRService } from "../../api/signalRService";

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
    const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const { mutateAsync, error, isPending } = useFileUpload();

    const isAllFilesUploaded = () => {
        return fileList && Array.from(fileList).every(file => uploadedFiles.includes(file.name));
    };

    useEffect(() => {
        if (fileList && fileList.length) setModalOpen(true);
    }, [fileList]);

    const handleCloseModal = () => {
        setModalOpen(false);
        setFileList(null);
        setUploadProgress({});
        setUploadedFiles([]);
    };

    const handleRemoveFile = (fileName: string) => {
        if (!fileList || uploadedFiles.includes(fileName)) return;
        
        const dt = new DataTransfer();
        Array.from(fileList)
            .filter(file => file.name !== fileName)
            .forEach(file => dt.items.add(file));
            
        setFileList(dt.files);
        if (dt.files.length === 0) {
            handleCloseModal();
        }
    };

    const handleForm = async () => {
        if (!fileList) return;

        if (!checkSelectedFilesSize(fileList)) return;

        const files = Array.from(fileList);
        const connectionId = await signalRService.getConnectionId();

        for (const file of files) {
            try {
                await mutateAsync({
                    file,
                    connectionId,
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = progressEvent.total
                            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                            : 0;
                        setUploadProgress(prev => ({ ...prev, [file.name]: percentCompleted }));
                    }
                });
                
                // После успешной мутации (когда axios-запрос завершился)
                // устанавливаем прогресс в 100%, если он еще не там
                setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
                setUploadedFiles(prev => [...prev, file.name]);

            } catch (error) {
                console.error(`Error uploading ${file.name}:`, error);
            }
        }
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
                    onChange={(e) => {
                        setFileList(e.target.files);
                        setUploadProgress({});
                        setUploadedFiles([]);
                    }}
                    multiple
                />
            </Button>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    backgroundColor: 'rgba(248, 250, 252, 0.4)',
                    backdropFilter: 'blur(4px)',
                }}
            >
                <div className="flex items-center justify-center h-full p-4">
                    <div className="flex flex-col gap-6 p-8 rounded-2xl bg-gradient-to-b from-white to-slate-50/95 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm max-h-[90vh] w-full max-w-2xl overflow-hidden border border-slate-100">
                        <div className="border-b border-slate-100 pb-4">
                            <h2 className="text-2xl font-semibold text-slate-800">Загрузка файлов</h2>
                            <p className="text-slate-500 mt-1">Выберите файлы для загрузки на облако</p>
                        </div>
                        {fileList && (
                            <DisplayModalFileList 
                                fileList={fileList} 
                                onRemoveFile={handleRemoveFile} 
                                isPending={isPending}
                                uploadProgress={uploadProgress}
                                uploadedFiles={uploadedFiles}
                            />
                        )}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <Button 
                                variant={isAllFilesUploaded() ? "contained" : "outlined"} 
                                onClick={handleCloseModal} 
                                disabled={isPending}
                                sx={{
                                    ...(isAllFilesUploaded()
                                        ? {
                                            backgroundColor: '#22c55e',
                                            color: '#ffffff',
                                            '&:hover': {
                                                backgroundColor: '#16a34a',
                                            },
                                        }
                                        : {
                                            color: '#64748b',
                                            borderColor: '#e2e8f0',
                                            '&:hover': {
                                                borderColor: '#94a3b8',
                                                backgroundColor: '#f8fafc',
                                            },
                                        }
                                    ),
                                    textTransform: 'none',
                                    fontWeight: 500
                                }}
                            >
                                {isAllFilesUploaded() ? 'Завершить' : 'Отменить'}
                            </Button>
                            <Button 
                                variant="contained" 
                                onClick={handleForm} 
                                disabled={isPending || Boolean(isAllFilesUploaded())}
                                startIcon={isPending ? (
                                    <CircularProgress 
                                        size={20} 
                                        sx={{ color: 'white' }} 
                                    />
                                ) : undefined}
                                sx={{
                                    backgroundColor: '#3b82f6',
                                    '&:hover': {
                                        backgroundColor: '#2563eb',
                                    },
                                    '&:disabled': {
                                        backgroundColor: '#bfdbfe',
                                        color: '#ffffff',
                                    },
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    minWidth: '120px'
                                }}
                            >
                                {!isPending && 'Загрузить файлы'}
                            </Button>
                        </div>
                        {error && (
                            <div className="text-red-500 text-sm mt-2 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
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