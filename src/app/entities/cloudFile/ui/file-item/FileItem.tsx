import React from "react";
import { CloudFile } from "../../model/types";
import IosShareIcon from '@mui/icons-material/IosShare';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatBytes } from "../../lib/formatBytes";
import { formatDate } from "../../lib/formatDate";
import styles from "./FileItem.module.css"
import FilePreview from "./FilePreview";
import { useFileDeleteWithoutRemove } from "../../hooks/useFileDeleteWithoutRemove";
import { useFileDelete } from "../../hooks/useFileDelete";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useRestoreFile } from "../../hooks/useRestoreFile";
import { useDownloadFile } from "../../hooks/useDownloadFile";

const FileItem = ({ fileData }: { fileData: CloudFile }) => {
    const { mutate: downloadFile } = useDownloadFile();
    const { mutate: deleteFileWithoutRemove } = useFileDeleteWithoutRemove();
    const { mutate: deleteFile } = useFileDelete();
    const { mutate: restoreFile } = useRestoreFile();

    const [openDialogMoveToTrash, setOpenDialogMoveToTrash,] = React.useState(false);
    const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
    const [openDialogRestore, setOpenDialogRestore] = React.useState(false);

    const handleFileDownload = () => {
        downloadFile(fileData.key)
    }

    const handleFileDeleteWithoutRemove = () => {
        deleteFileWithoutRemove(fileData.key);
        setOpenDialogMoveToTrash(false);
    }
    const handleFileDelete = () => {
        deleteFile(fileData.key);
        setOpenDialogDelete(false);
    }

    const handleFileRestore = () => {
        restoreFile(fileData.key);
        setOpenDialogRestore(false);
    }

    return (
        <div className={`${styles.file} flex gap-2 items-center justify-between p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 hover:shadow-lg hover:scale-[1.005] hover:z-10 duration-300 ease-in-out transform`}>
            <div className="grid grid-cols-[5%_30%_20%_1fr] w-[80%] gap-10">
                <FilePreview extension={fileData.extension} />
                <span className="my-auto text-ellipsis text-clip overflow-hidden text-gray-900">{fileData.name}{fileData.extension ? `.${fileData.extension}` : ''}</span>
                <span className="my-auto text-ellipsis text-gray-700">{formatDate(fileData.modifiedAt)}</span>
                <span className="my-auto text-ellipsis text-gray-700">{formatBytes(fileData.size)}</span>
            </div>
            {!fileData.deletedAt ? (
                <div className={`${styles["file-buttons"]} flex gap-2 align-center`}>
                    <button className="text-gray-600 hover:text-blue-600"><IosShareIcon /></button>
                    <button onClick={handleFileDownload} className="text-gray-600 hover:text-blue-600"><DownloadIcon /></button>
                    <button className="text-gray-600 hover:text-blue-600"><EditIcon /></button>
                    <button onClick={() => setOpenDialogMoveToTrash(true)} className="text-gray-600 hover:text-red-600"><DeleteIcon /></button>
                </div>
            ) : (
                <div className={`${styles["file-buttons"]} flex gap-2 align-center`}>
                    <button onClick={() => setOpenDialogRestore(true)} className="text-gray-600 hover:text-blue-600"><RestoreFromTrashIcon /></button>
                    <button onClick={() => setOpenDialogDelete(true)} className="text-gray-600 hover:text-red-600"><DeleteIcon /></button>
                </div>
            )}
            <Dialog
                open={openDialogMoveToTrash}
                onClose={() => setOpenDialogMoveToTrash(false)}
                PaperProps={{
                    style: {
                        backgroundColor: '#ffffff',
                        color: '#171717',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        borderRadius: '25px',
                        padding: '8px',
                        fontFamily: 'Arial, Helvetica, sans-serif'
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title" style={{ color: '#171717', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    {"Переместить в корзину?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ color: '#666666', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                        После нажатия кнопки &rsquo;&rsquo;Продолжить&rsquo;&rsquo; ваш файл будет перемещен в корзину
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialogMoveToTrash(false)} sx={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>Отменить</Button>
                    <Button onClick={handleFileDeleteWithoutRemove} autoFocus sx={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                        Продолжить
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openDialogDelete}
                onClose={() => setOpenDialogDelete(false)}
                PaperProps={{
                    style: {
                        backgroundColor: '#ffffff',
                        color: '#171717',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        borderRadius: '25px',
                        padding: '8px',
                        fontFamily: 'Arial, Helvetica, sans-serif'
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title" style={{ color: '#171717', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    {"Удалить файл?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ color: '#666666', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                        После нажатия кнопки &rsquo;&rsquo;Продолжить&rsquo;&rsquo; ваш файл будет удален без возможности восстановления
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialogDelete(false)} sx={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>Отменить</Button>
                    <Button onClick={handleFileDelete} autoFocus sx={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                        Продолжить
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openDialogRestore}
                onClose={() => setOpenDialogRestore(false)}
                PaperProps={{
                    style: {
                        backgroundColor: '#ffffff',
                        color: '#171717',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        borderRadius: '25px',
                        padding: '8px',
                        fontFamily: 'Arial, Helvetica, sans-serif'
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title" style={{ color: '#171717', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    {"Восстановить файл?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ color: '#666666', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                        После нажатия кнопки &rsquo;&rsquo;Продолжить&rsquo;&rsquo; ваш файл снова будет доступен
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialogRestore(false)} sx={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>Отменить</Button>
                    <Button onClick={handleFileRestore} autoFocus sx={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                        Продолжить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FileItem;
