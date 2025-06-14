'use client'

import { useState, useEffect } from 'react';
import { UserDto } from '@/core/features/storage-quota/api/getSelfUser';
import { useQuery } from '@tanstack/react-query';
import { getSelfUserAvatar } from '../api/users';

interface UseUserAvatarLoaderReturn {
    avatarBlobUrl: string | null;
    isAvatarLoading: boolean;
}

export const useUserAvatarLoader = (userData: UserDto | null | undefined): UseUserAvatarLoaderReturn => {
    const [avatarBlobUrl, setAvatarBlobUrl] = useState<string | null>(null);

    const { data: avatarBlob, isLoading: isAvatarLoading } = useQuery<Blob>({
        queryKey: ['userAvatar', userData?.id, userData?.avatarTimestamp],
        queryFn: getSelfUserAvatar,
        enabled: !!userData && !!userData.id,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        retry: 1,
    });

    useEffect(() => {
        if (!avatarBlob) {
            setAvatarBlobUrl(null);
            return;
        }

        const newObjectUrl = URL.createObjectURL(avatarBlob);
        setAvatarBlobUrl(newObjectUrl);

        // Эта функция очистки будет вызвана, когда avatarBlob изменится или компонент размонтируется.
        // Она удалит URL, который был создан в этом же "прогоне" useEffect.
        return () => {
            URL.revokeObjectURL(newObjectUrl);
        };
    }, [avatarBlob]);

    return { avatarBlobUrl, isAvatarLoading };
}; 