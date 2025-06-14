const MAX_SIZE = 20 * 1024 * 1024 * 1024; // 20gb

export const checkSelectedFilesSize = (fileList: FileList): boolean => {
    let size = 0;
    [...fileList].forEach(
        item => size += item.size
    );

    return size < MAX_SIZE;
};