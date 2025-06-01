import React from "react";
import { CloudFile } from "../../model/types";
import IosShareIcon from '@mui/icons-material/IosShare';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import { formatBytes } from "../../lib/formatBytes";
import { formatDate } from "../../lib/formatDate";
import styles from "./FileItem.module.css"
import FilePreview from "./FilePreview";
import DeleteIcon from '@mui/icons-material/Delete';
import { useFileDeleteWithoutRemove } from "../../hooks/useFileDeleteWithoutRemove";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";


const FileItem = ({ fileData }: { fileData: CloudFile }) => {
    const { mutate: deleteFileWithoutRemove } = useFileDeleteWithoutRemove()
    const handleFileDeleteWithoutRemove = () => {
        deleteFileWithoutRemove(fileData.key);
        setOpenDialogRemove(false);
    }
      const [openDialogRemove, setOpenDialogRemove] = React.useState(false);

    return (
        <div className={`${styles.file} flex gap-2 items-center justify-between p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 hover:shadow-lg hover:scale-[1.01] duration-300 ease-in-out transform`}>
            <div className="grid grid-cols-[5%_30%_20%_1fr] w-[80%] gap-10">
                <FilePreview extension={fileData.extension} />
                <span className="my-auto text-ellipsis text-clip overflow-hidden">{fileData.name}{fileData.extension ? `.${fileData.extension}` : ''}</span>
                <span className="my-auto text-ellipsis">{formatDate(fileData.modifiedAt)}</span>
                <span className="my-auto text-ellipsis">{formatBytes(fileData.size)}</span>
            </div>
            <div className={`${styles["file-buttons"]} flex gap-2 align-center`}>
                <button><IosShareIcon /></button>
                <button><DownloadIcon /></button>
                <button><EditIcon /></button>
                {!fileData.deletedAt && <button onClick={() => setOpenDialogRemove(true)}><DeleteIcon /></button>}
                <Dialog
                    open={openDialogRemove}
                    onClose={() => setOpenDialogRemove(false)}
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Переместить в корзину?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            После нажатия кнопки &rsquo;&rsquo;Продолжить&rsquo;&rsquo; ваш файл будет перемещен в корзину
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialogRemove(false)}>Отменить</Button>
                        <Button onClick={handleFileDeleteWithoutRemove} autoFocus>
                            Продолжить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default FileItem;
