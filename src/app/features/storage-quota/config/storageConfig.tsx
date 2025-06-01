import { ImageIcon, VideoIcon, DocumentIcon, ArchiveIcon, OtherIcon } from '../ui/icons/StorageIcons';
import { StorageType } from '../types/types';

export const STORAGE_TYPES: StorageType[] = [
    {
        type: 'Изображения',
        used: 0,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        icon: <ImageIcon />
    },
    {
        type: 'Видео',
        used: 0,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        icon: <VideoIcon />
    },
    {
        type: 'Документы',
        used: 0,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        icon: <DocumentIcon />
    },
    {
        type: 'Архивы',
        used: 0,
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
        icon: <ArchiveIcon />
    },
    {
        type: 'Прочее',
        used: 0,
        color: 'text-gray-600',
        bgColor: 'bg-gray-50',
        icon: <OtherIcon />
    }
]; 