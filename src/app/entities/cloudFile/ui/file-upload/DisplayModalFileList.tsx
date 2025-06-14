import React from 'react'
import { LinearProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface DisplayModalFileListProps {
    fileList: FileList;
    onRemoveFile?: (fileName: string) => void;
    isPending?: boolean;
    uploadProgress: { [key: string]: number };
    uploadedFiles: string[];
}

const DisplayModalFileList = ({ fileList, onRemoveFile, isPending, uploadProgress, uploadedFiles }: DisplayModalFileListProps) => {
    return (
        <div className="flex-1 min-h-0">
            <div className="overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                <div className="space-y-2">
                    {Array.from(fileList).map((file) => {
                        const isUploaded = uploadedFiles.includes(file.name);
                        const progress = uploadProgress[file.name] || 0;

                        return (
                            <div 
                                key={file.name} 
                                className="flex flex-col gap-2 p-3 bg-white rounded-xl border border-slate-100 hover:bg-blue-50/50 hover:border-blue-200 transition-all group shadow-[0_2px_8px_rgb(0,0,0,0.02)]"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-700 truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-sm text-slate-400">
                                            {(file.size / (1024 * 1024)).toFixed(2)} МБ
                                        </p>
                                    </div>
                                    {onRemoveFile && !isPending && !isUploaded && (
                                        <button
                                            onClick={() => onRemoveFile(file.name)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-50 rounded-full"
                                            title="Удалить файл"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 hover:text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    )}
                                    {isUploaded && (
                                        <CheckCircleIcon 
                                            className="text-green-500" 
                                            sx={{ fontSize: 24 }}
                                        />
                                    )}
                                </div>
                                {(progress > 0 || isUploaded) && (
                                    <LinearProgress 
                                        variant="determinate" 
                                        value={progress}
                                        sx={{
                                            height: 6,
                                            borderRadius: 3,
                                            backgroundColor: '#e2e8f0',
                                            '.MuiLinearProgress-bar': {
                                                backgroundColor: isUploaded ? '#22c55e' : '#3b82f6',
                                                borderRadius: 3,
                                                transition: 'transform 0.2s linear'
                                            }
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #e2e8f0;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #cbd5e1;
                }
            `}</style>
        </div>
    )
}

export default DisplayModalFileList