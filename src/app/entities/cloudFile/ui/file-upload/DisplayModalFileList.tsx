import React from 'react'

const DisplayModalFileList = ({fileList}: {fileList: FileList}) => {
    return (
        <ul className="overflow-y-auto">
            {Array.from(fileList).map((file) => (
                <li key={file.name}>{file.name}</li>
            ))}
        </ul>
    )
}

export default DisplayModalFileList