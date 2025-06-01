import React from 'react'

const DisplayModalFileList = ({fileList}: {fileList: FileList}) => {
    return (
        <div className="max-h-[400px]">
            <h3 className="text-gray-800 text-lg font-medium mb-4">Выбранные файлы:</h3>
            <ul className="overflow-y-auto space-y-2">
                {Array.from(fileList).map((file) => (
                    <li key={file.name} className="flex items-center gap-2 text-gray-600 bg-gray-50 p-2 rounded-lg">
                        <span className="truncate">{file.name}</span>
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                            ({(file.size / (1024 * 1024)).toFixed(2)} МБ)
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DisplayModalFileList