const MAX_SIZE = 20 * 1024 * 1024 * 1024; // 20gb

export const checkFileSize = (file: File): boolean => {
    return file.size < MAX_SIZE;
}